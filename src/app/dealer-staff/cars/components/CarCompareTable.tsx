import React from "react";

// interface Props {
//   cars: Car[];
// }
const CarCompareTable: React.FC = () => {
  // const formatPrice = (price: number) =>
  //   new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  // // Icons cho từng attribute
  // const attributeIcons = {
  //   price: <DollarOutlined className="text-green-500 text-lg" />,
  //   seats: <TeamOutlined className="text-blue-500 text-lg" />,
  //   type: <CarOutlined className="text-purple-500 text-lg" />,
  //   engine: <ThunderboltOutlined className="text-yellow-500 text-lg" />
  // };

  // Dữ liệu table
  // const dataSource = [
  //   {
  //     key: "price",
  //     attribute: "Giá bán",
  //     icon: attributeIcons.price,
  //     ...cars.reduce((acc, car) => ({ ...acc, [car.id]: formatPrice(car.price) }), {})
  //   },
  //   {
  //     key: "seats",
  //     attribute: "Số chỗ ngồi",
  //     icon: attributeIcons.seats,
  //     ...cars.reduce((acc, car) => ({ ...acc, [car.id]: `${car.seat} chỗ` }), {})
  //   },
  //   {
  //     key: "modelName",
  //     attribute: "Tên model",
  //     icon: attributeIcons.type,
  //     ...cars.reduce((acc, car) => ({ ...acc, [car.id]: car.modelName }), {})
  //   }
  // ];

  // const columns = [
  //   {
  //     title: (
  //       <div className="flex items-center gap-2 text-gray-700 font-bold text-base">
  //         <TrophyOutlined className="text-green-600 text-xl" />
  //         <span>Thông Số</span>
  //       </div>
  //     ),
  //     dataIndex: "attribute",
  //     key: "attribute",
  //     width: "25%",
  //     render: (text: string, record: { icon: React.ReactNode }) => (
  //       <div className="flex items-center gap-3">
  //         {record.icon}
  //         <span className="font-semibold text-gray-800">{text}</span>
  //       </div>
  //     )
  //   },
  //   ...cars.map((car) => ({
  //     title: (
  //       <div className="text-center">
  //         <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold shadow-lg">
  //           <CarOutlined />
  //           <span>{car.vin}</span>
  //         </div>
  //       </div>
  //     ),
  //     dataIndex: car.id,
  //     key: car.id,
  //     width: `${75 / cars.length}%`,
  //     render: (text: string) => (
  //       <div className="text-center font-semibold text-gray-700 py-1">{text}</div>
  //     )
  //   }))
  // ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered={false}
          className="modern-compare-table"
          rowClassName={(_, index) => (index % 2 === 0 ? "bg-gray-50" : "bg-white")}
        /> */}
      </div>
    </div>
  );
};

export default CarCompareTable;
