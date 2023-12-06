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
  console.log("response", orderState)

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    const orderItems = orderState[i]?.orderItems || []; // Ensure orderItems exist
    for (let j = 0; j < orderItems.length; j++) {
      const productTitle = orderItems[j]?.product?.title || 'N/A';
      data1.push({
        key: data1.length + 1,
        orderid: orderState[i]?._id,
        producttitle: productTitle,
        totalamount: orderState[i]?.totalPrice,
        totalreedimearned: orderItems[j]?.product?.reedim || 0,
        totalamountafterdiscount:
          orderState[i]?.totalPrice - (orderItems[j]?.product?.reedim || 0),
        status: orderState[i]?.status,
      });
    }
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
