import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeletePlan from "./DeletePlan.jsx";
import UpdatePlan from "./UpdatePlan.jsx";

const columns = [
  {
    title: "Plan Name",
    dataIndex: "name",
  },
  {
    title: "Plan Cost",
    dataIndex: "planCost",
  },
  {
    title: "Meal Count",
    dataIndex: "mealCount",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

// Sample tableData = [
// {
//   key: "1",
//   name: "One Meal",
//   cost: 1000,
//   meals: 30,
//   actions: <TableActions />,
// }
// ];

const ViewPlans = () => {
  const [plansData, setPlansData] = useState();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/user/mess/plans",

          {
            headers: {
              Authorization: `${import.meta.env.VITE_ACCESS_TOKEN}`,
            },
          }
        );
        setPlansData(
          response?.data?.map((data) => {
            console.log(data);
            data.key = data?._id;
            data.actions = (
              <>
                <UpdatePlan
                  planData={data}
                  plansData={plansData}
                  setPlansData={setPlansData}
                />
                &nbsp;&nbsp;&nbsp;
                <DeletePlan />
              </>
            );
            return data;
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={plansData}
        bordered
        pagination={{ defaultPageSize: "3" }}
      />
    </div>
  );
};

export default ViewPlans;
