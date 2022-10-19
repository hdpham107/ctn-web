import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Select } from "antd";

import Widget from '../../../Widget';
const Option = Select.Option;

const data = [
    { month: '', views: 200 },
    { month: 'Tháng 1', views: 400 },
    { month: 'Tháng 2', views: 150 },
    { month: 'Tháng 3', views: 400 },
    { month: 'Tháng 4', views: 1000 },
    { month: 'Tháng 5', views: 400 },
    { month: 'Tháng 6', views: 1200 },
    { month: 'Tháng 7', views: 1000 },
    { month: 'Tháng 8', views: 800 },
    { month: 'Tháng 9', views: 750 },
    { month: 'Tháng 10', views: 1500 },
    { month: 'Tháng 11', views: 1000 },
    { month: 'Tháng 12', views: 1500 }
];

const BalanceHistory = () => {
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <Widget styleName="gx-card-full">

            <div className="ant-row-flex gx-px-4 gx-pt-4">
                <h2 className="h4 gx-mb-3">Số lượt xem trang của bạn</h2>
                <div className="gx-ml-auto">
                    <Select className="gx-mb-2 gx-select-sm" defaultValue="10" onChange={handleChange}>
                        <Option value="10">Trước 10 ngày</Option>
                        <Option value="20">Trước 20 ngày</Option>
                        <Option value="30">Trước 30 ngày</Option>
                    </Select>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Tooltip />
                    <XAxis dataKey="month" />
                    <defs>
                        <linearGradient id="color15" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38AAE5" />
                            <stop offset="95%" stopColor="#F5FCFD" />
                        </linearGradient>
                    </defs>
                    <Area dataKey='views' strokeWidth={2} stackId="2" stroke='#10316B' fill="url(#color15)"
                        fillOpacity={1} />
                </AreaChart>
            </ResponsiveContainer>
        </Widget>
    );
};

export default BalanceHistory;
