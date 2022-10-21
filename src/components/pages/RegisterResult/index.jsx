import React, { Fragment } from 'react';
import { Typography, Avatar, Icon, Input } from 'antd';

const result = {
  name: 'Đặng Thị Mỹ Trinh',
  buddaName: 'Thể Nguyệt Chơn',
  gender: 'Nữ',
  yob: 1999,
  cccd: '077199003258',
  phone: '0898683018',
  email: 'tringdang1999@gmail.com',
  workPlace: 'TP Bà Rịa',
  registerType: 'Cá nhân',
};
const res = {
  id: 0,
  maSo: 'string',
  memberId: 0,
  noiXuatPhat: 'nơi xuất phát',
  thoiDiemVeChua: 'thời điểm về chùa',
  thoiDiemVeNoiXuatPhat: 'thời điểm về nơi xuất phát',
  noiNhanThe: 'Nơi nhận thẻ',
  trangThaiIn: 0,
  trangThaiNhanThe: 0,
  dotDangKy: 'đợt đăng ký',
  khuVuc: 'string',
  nhomTruongKhuVuc: 'trưởng nhóm khu vực',
  hdChamSoc: 'HD chăm sóc',
  thongTinThayDoi: 'thông tin thay đổi',
  diaChi_IDQuocGia: 0,
  diaChi_IDTinh: 0,
  diaChi_IDHuyen: 0,
  diaChi_IDXa: 0,
  diaChi_SoNha: 'string',
  idDaiLe: 0,
  vaiTro: 'vai trò',
  tuNgay: '2022-10-20T10:58:13.444Z',
  denNgay: '2022-10-20T10:58:13.444Z',
  ghiChu: 'ghi chú',
  trangThai: 0,
  inUsed: true,
  createdBy: 0,
  createdAt: '2022-10-20T10:58:13.445Z',
  updatedBy: 0,
  updatedAt: '2022-10-20T10:58:13.445Z',
  isDuyet: false,
  isChinhSua: 0,
  teamLeader: 'tên trưởng nhóm',
  phanLoaiThanhNien: 0,
  brmMemberId: 0,
  ma: 'string',
  maBanKinhNghiem: 'mã ban kinh nghiệm',
  maBanNguyenVong: 'mã ban nguyện vọng',
  tenBanKinhNghiem: 'tên ban kinh nghiệm',
  tenBanNguyenVong: 'Tên ban nguyện vọng',
  thoiGianVeChua: '2022-10-20T10:58:13.445Z',
  thoiGianVeDiemXuatPhat: '2022-10-20T10:58:13.445Z',
  maChuyenBayDen: 'mã chuyến bay đến',
  maChuyenBayVe: 'mã chuyến bay về',
};
/* 
Nơi sinh hoạt
Họ tên
Giới tính
Năm sinh
CCCD
SDT
Địa điểm xuất phát
Thời gian về chùa

 */
const { Title } = Typography;

const NoBoderInput = (props) => (
  <Input {...props} className={`border-0 bg-light ${props.className}`} />
);

const RegisterResult = (props) => {
  return (
    <div className="container-fluid">
      <Title className="text-center">
        Thông tin đăng ký và kết quả phân ban
      </Title>
      <div className="row">
        <div className="col-6 col-md-3  border-end">
          <div className="d-flex flex-column align-items-center border-bottom pb-2">
            <Avatar size={100} icon="user" className="mb-2" />
            <NoBoderInput
              value={result.name}
              className="text-center"
              style={{ background: '#f5f5f5' }}
            />
          </div>
          {/* Ket qua phan ban */}
          {res.isDuyet ? (
            <div
              className="badge bg-success p-2 rounded mt-2"
              style={{ userSelect: 'none' }}
            >
              {res.tenBanNguyenVong}
            </div>
          ) : (
            <div
              className="badge bg-warning p-2 rounded mt-2"
              style={{ userSelect: 'none' }}
            >
              Đang chờ xét duyệt ban
            </div>
          )}

          {/* Đăng ký theo nhóm */}
          {res.teamLeader && (
            <div
              className="badge bg-info p-2 rounded mt-2"
              style={{ userSelect: 'none' }}
            >
              {res.teamLeader != result.name
                ? `Trưởng nhóm: ${res.teamLeader}`
                : 'Nhóm'}
            </div>
          )}
        </div>

        <div className="col-6 col-md-9 row mx-0 d-flex">
          <div className="col-12 col-md-6 col-lg-4 ps-lg-0">
            <div className="mb-2">
              <div>Giới tính: </div>
              <NoBoderInput value={result.gender} placeholder="Giới tính" />
            </div>
            <div className="mb-2">
              <span>Năm sinh: </span>
              <NoBoderInput value={result.yob} placeholder="Năm sinh" />
            </div>
            <div className="mb-2">
              <span>CCCD: </span>
              <NoBoderInput value={result.cccd} placeholder="CCCD" />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-2">
              <div>Số điện thoại: </div>
              <NoBoderInput value={result.phone} placeholder="Giới tính" />
            </div>
            <div className="mb-2">
              <span>Email: </span>
              <NoBoderInput value={result.email} placeholder="Năm sinh" />
            </div>
            <div className="mb-2">
              <span>Nơi sinh sống và làm việc: </span>
              <NoBoderInput value={result.workPlace} placeholder="CCCD" />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-2">
              <div>Pháp danh: </div>
              <NoBoderInput value={result.buddaName} placeholder="Giới tính" />
            </div>
            <div className="mb-2">
              <span>Email: </span>
              <NoBoderInput value={result.email} placeholder="Năm sinh" />
            </div>
            <div className="mb-2">
              <span>Nơi sinh sống và làm việc: </span>
              <NoBoderInput value={result.workPlace} placeholder="CCCD" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterResult;
