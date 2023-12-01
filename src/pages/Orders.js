import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/user/userSlice";
import Container from "../component/Container";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order Id",
    dataIndex: "orderid",
  },
  {
    title: "Product Title",
    dataIndex: "producttitle",
  },
  {
    title: "Total Amount",
    dataIndex: "totalamount",
  },
  {
    title: "Reedim Earned",
    dataIndex: "totalreedimearned",
  },
  {
    title: "Total Amount After Discount",
    dataIndex: "totalamountafterdiscount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.getorderedProduct);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      orderid: orderState[i]?._id,
      producttitle: orderState[i]?.orderItems[i]?.product?.title,
      totalamount: orderState[i]?.totalPrice,
      totalreedimearned: orderState[i]?.orderItems[i]?.product?.reedim,
      totalamountafterdiscount:
        orderState[i]?.totalPrice -
        orderState[i]?.orderItems[i]?.product?.reedim,
      status: orderState[i]?.status,
    });
  }

  return (
    <>
      <Meta title={"Account"} />
      <BreadCrum title="My Orders" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="mt-2">
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
