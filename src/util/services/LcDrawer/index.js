import LCC from 'literallycanvas'
require('./literallycanvas.css')



export const LC = LCC

const lc = (element) => {
	if (document.getElementById(element)) {
		return LC.init(document.getElementById(element), {
			imageURLPrefix: './LcDrawer/lc-images',
			toolbarPosition: 'top',
			defaultStrokeWidth: 2,
			strokeWidths: [1, 2, 3, 5, 30]
		});
	}
}

export default lc