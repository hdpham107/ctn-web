import { Tabs } from "antd";
import React from "react";
import "./style.scss";
import { Typography, Button } from "antd";
const { Title } = Typography;

// import '../../../assets/images/layouts/festival/BAN_MT.jpg'
export const Festival = () => {
  const fest_infos = [
    {
      tab: "MÔI TRƯỜNG",
      image1: "",
      content:
        "Chủ nhật, ngày 02/10/2022, Chúng thanh niên Phật tử Phật Quang phối hợp cùng Viện Huyết Học Truyền Máu Trung Ương đã tổ chức chương trình hiến máu nhân đạo tại chùa Tứ Kỳ (số 8, Ngọc Hồi, Giải Phóng, Hoàng Mai, Hà Nội). Chương trình đã thu hút được hơn 500 huynh đệ đến từ Chúng thanh niên Phật tử Phật Quang Hà Nội và các bạn thanh niên, sinh viên cùng các cô bác lớn tuổi hào hứng tham gia hiến máu. Từ 6h30 sáng, cổng chùa đã trở nên nhộn nhịp khi mọi người vui vẻ cùng nhau đến hiến máu và phục vụ cho công tác chuẩn bị. Đặc biệt, ngoài các huynh đệ, các bạn thanh niên sinh viên, còn có những cô bác vượt cả chặng đường xa xôi đến hiến máu. Có cô Phật tử vượt qua quãng đường hơn 80km đã vỡ òa trong niềm hạnh phúc khi lần đầu tiên cô được trao tặng những giọt máu của mình.   Còn gì hạnh phúc hơn khi chúng ta có cơ hội được phụng sự, giúp đỡ những người xung quanh. Còn gì hạnh phúc hơn khi chúng ta có cơ hội để trao tình thương yêu đến với mọi người bằng những hành động vô cùng ý nghĩa này. Mong rằng, những đơn vị máu này sẽ mang lại sự sống cho nhiều người, để ai cũng có sức khỏe, cùng làm việc, cống hiến cho đất nước này. ",
    },
    {
      tab: "HƯỚNG DẪN",
      content:
        "Chủ nhật, ngày 02/10/2022, Chúng thanh niên Phật tử Phật Quang phối hợp cùng Viện Huyết Học Truyền Máu Trung Ương đã tổ chức chương trình hiến máu nhân đạo tại chùa Tứ Kỳ (số 8, Ngọc Hồi, Giải Phóng, Hoàng Mai, Hà Nội). Chương trình đã thu hút được hơn 500 huynh đệ đến từ Chúng thanh niên Phật tử Phật Quang Hà Nội và các bạn thanh niên, sinh viên cùng các cô bác lớn tuổi hào hứng tham gia hiến máu. Từ 6h30 sáng, cổng chùa đã trở nên nhộn nhịp khi mọi người vui vẻ cùng nhau đến hiến máu và phục vụ cho công tác chuẩn bị. Đặc biệt, ngoài các huynh đệ, các bạn thanh niên sinh viên, còn có những cô bác vượt cả chặng đường xa xôi đến hiến máu. Có cô Phật tử vượt qua quãng đường hơn 80km đã vỡ òa trong niềm hạnh phúc khi lần đầu tiên cô được trao tặng những giọt máu của mình.   Còn gì hạnh phúc hơn khi chúng ta có cơ hội được phụng sự, giúp đỡ những người xung quanh. Còn gì hạnh phúc hơn khi chúng ta có cơ hội để trao tình thương yêu đến với mọi người bằng những hành động vô cùng ý nghĩa này. Mong rằng, những đơn vị máu này sẽ mang lại sự sống cho nhiều người, để ai cũng có sức khỏe, cùng làm việc, cống hiến cho đất nước này. ",
    },
    {
      tab: "BẢO VỆ",
      content:
        "Chủ nhật, ngày 02/10/2022, Chúng thanh niên Phật tử Phật Quang phối hợp cùng Viện Huyết Học Truyền Máu Trung Ương đã tổ chức chương trình hiến máu nhân đạo tại chùa Tứ Kỳ (số 8, Ngọc Hồi, Giải Phóng, Hoàng Mai, Hà Nội). Chương trình đã thu hút được hơn 500 huynh đệ đến từ Chúng thanh niên Phật tử Phật Quang Hà Nội và các bạn thanh niên, sinh viên cùng các cô bác lớn tuổi hào hứng tham gia hiến máu. Từ 6h30 sáng, cổng chùa đã trở nên nhộn nhịp khi mọi người vui vẻ cùng nhau đến hiến máu và phục vụ cho công tác chuẩn bị. Đặc biệt, ngoài các huynh đệ, các bạn thanh niên sinh viên, còn có những cô bác vượt cả chặng đường xa xôi đến hiến máu. Có cô Phật tử vượt qua quãng đường hơn 80km đã vỡ òa trong niềm hạnh phúc khi lần đầu tiên cô được trao tặng những giọt máu của mình.   Còn gì hạnh phúc hơn khi chúng ta có cơ hội được phụng sự, giúp đỡ những người xung quanh. Còn gì hạnh phúc hơn khi chúng ta có cơ hội để trao tình thương yêu đến với mọi người bằng những hành động vô cùng ý nghĩa này. Mong rằng, những đơn vị máu này sẽ mang lại sự sống cho nhiều người, để ai cũng có sức khỏe, cùng làm việc, cống hiến cho đất nước này. ",
    },
    {
      tab: "HÀNH ĐƯỜNG TĂNG NI",
      content:
        "Chủ nhật, ngày 02/10/2022, Chúng thanh niên Phật tử Phật Quang phối hợp cùng Viện Huyết Học Truyền Máu Trung Ương đã tổ chức chương trình hiến máu nhân đạo tại chùa Tứ Kỳ (số 8, Ngọc Hồi, Giải Phóng, Hoàng Mai, Hà Nội). Chương trình đã thu hút được hơn 500 huynh đệ đến từ Chúng thanh niên Phật tử Phật Quang Hà Nội và các bạn thanh niên, sinh viên cùng các cô bác lớn tuổi hào hứng tham gia hiến máu. Từ 6h30 sáng, cổng chùa đã trở nên nhộn nhịp khi mọi người vui vẻ cùng nhau đến hiến máu và phục vụ cho công tác chuẩn bị. Đặc biệt, ngoài các huynh đệ, các bạn thanh niên sinh viên, còn có những cô bác vượt cả chặng đường xa xôi đến hiến máu. Có cô Phật tử vượt qua quãng đường hơn 80km đã vỡ òa trong niềm hạnh phúc khi lần đầu tiên cô được trao tặng những giọt máu của mình.   Còn gì hạnh phúc hơn khi chúng ta có cơ hội được phụng sự, giúp đỡ những người xung quanh. Còn gì hạnh phúc hơn khi chúng ta có cơ hội để trao tình thương yêu đến với mọi người bằng những hành động vô cùng ý nghĩa này. Mong rằng, những đơn vị máu này sẽ mang lại sự sống cho nhiều người, để ai cũng có sức khỏe, cùng làm việc, cống hiến cho đất nước này. ",

    },
    {
      tab: "BAN XE",
      content: "Bla bla Hành đường tăng ni",
    },
  ];
  return (
    <div>
    <Title style={{ padding: '10px 40px' }}>Giới thiệu các ban tham gia Công quả Đại Lễ!</Title>
    <Tabs defaultActiveKey="0" tabPosition="left">
      {fest_infos.map((data, i) => (
        <Tabs.TabPane tab={data.tab} key={i}>
          <div class="festival_item">
            <Title>{`BAN ${data.tab}`}</Title>

            <div class="festival_item_body">
              <div class="container_img">
                <img style={{ width: '40%' }} src="/images/festival/BAN_MT.jpg"></img>
              </div>
              <div class="container_content">{data.content}</div>
              <Button style={{ background: 'green', height: '60px' }}>
                <Title style= {{ color: 'white' }}>Đăng ký ngay!!</Title>
              </Button>
            </div>
          </div>
        </Tabs.TabPane>
      ))}
    </Tabs>
    </div>
  );
};
