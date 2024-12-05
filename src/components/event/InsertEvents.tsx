import React from 'react';
import { Button, Form, Input, DatePicker, Checkbox, Switch } from 'antd';

const InsertEvents = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form values: ', values);
    // Xử lý gửi dữ liệu form ở đây
  };

  return (
    <div className='p-4 flex flex-col gap-6'>
      <div>
        <div>
          <div className="font-bold mb-2">Ảnh bìa sự kiện</div>
          <div className='flex justify-between items-center'>
            <div className='bg-[#E4E7EC] flex gap-2 flex-col justify-center items-center' style={{ width: '700px', height: '300px' }}>
              <Button size="large" className='bg-[#E4E7EC] border-2 border-black font-bold'>
                + Tải ảnh bìa lên
              </Button>
              <p>Kích thước tối ưu 1440x570px (Tối đa 3MB)</p>
            </div>
            <svg width="2" height="268" viewBox="0 0 2 268" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.20581" y1="-2.18557e-08" x2="1.20582" y2="268" stroke="#E4E7EC" />
            </svg>
            <div className='bg-[#E4E7EC] flex gap-2 flex-col justify-center items-center' style={{ width: '300px', height: '300px' }}>
              <Button size="large" className='bg-[#E4E7EC] border-2 border-black font-bold'>
                + Tải ảnh bìa lên
              </Button>
              <p>Kích thước tối ưu 1440x570px (Tối đa 3MB)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-lg shadow-gray-500/50 p-4 rounded-2xl">
        <div className="mb-2 font-bold">Thông tin chung</div>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="eventName"
            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Tên sự kiện</label>
                <span className="text-red-500">*</span>
              </div>
              <div className="w-full">
                <Input placeholder="Nhập tên sự kiện" />
              </div>
            </div>

          </Form.Item>

          <Form.Item
            name="eventTime"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Thời gian diễn ra</label>
                <span className="text-red-500">*</span>
              </div>
              <div className="w-full">
                <DatePicker showTime placeholder="Chọn thời gian diễn ra" style={{ width: '100%' }} />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="allowViewAllImages"
            valuePropName="checked"
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Cho phép xem toàn bộ ảnh</label>
              </div>
              <div className="w-full">
                <Switch />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="allowFaceSearch"
            valuePropName="checked"
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Cho phép tìm ảnh bằng khuôn mặt</label>
              </div>
              <div className="w-full">
                <Switch />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="allowBibTextSearch"
            valuePropName="checked"
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Cho phép tìm ảnh bằng số BIB/Text</label>
              </div>
              <div className="w-full">
                <Switch />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="highlightEvent"
            valuePropName="checked"
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Nổi bật sự kiện</label>
              </div>
              <div className="w-full">
                <Switch />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="googleDriveLink"
            rules={[{ required: true, message: 'Vui lòng nhập link ảnh Google Drive!' }]}
          >
            <div className="flex gap-2 w-full items-center">
              <div className="flex justify-end w-[250px]">
                <label className="mr-2">Link ảnh Google Drive</label>
              </div>
              <div className="w-full flex gap-2">
                <Input placeholder="Nhập link ảnh Google Drive" />
                <Button className="bg-[#C7DBFF]">+</Button>
              </div>

            </div>
          </Form.Item>

        </Form>
      </div>
      <div className="flex justify-end gap-2">
        <Button size="large" className='bg-white text-[#275FC1] border-[#275FC1] border-2 font-bold' htmlType="submit">
          Lưu lại
        </Button>
        <Button size="large" className='bg-[#275FC1] text-white border-[#275FC1] border-2 font-bold' htmlType="submit">
          Xuất bản
        </Button>
      </div>


    </div>
  );
}

export default InsertEvents;
