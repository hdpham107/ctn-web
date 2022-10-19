const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
const rewireSass = require("react-app-rewire-scss");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#038fde"
    },
    javascriptEnabled: true
  })(config, env);
  config = rewireSass(config, env);

  // Extract the oneOf array from the relevant webpack.module.rules object
  const i = config.module.rules.findIndex(item => {
    return item.hasOwnProperty("oneOf");
  });
  const oneOf = config.module.rules[i].oneOf;

  // Add the SVG and CSS loaders to the oneOf array
  const additions = [
    {
      // transpile ES6 files to ES5 for minifying
      test: /(split-on-first)|(strict-uri-encode)|(query-string)|(ckeditor5*-[^\/\\]+)[\/\\].+\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [require('@babel/preset-env')]
          }
        }
      ],
    },
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      use: ["raw-loader"]
    },
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
      use: [
        {
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag"
          }
        },
        {
          loader: "postcss-loader",
          options: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
            },
            minify: true
          })
        }
      ]
    }
  ];

  additions.forEach(item => oneOf.unshift(item));

  return config;
};
