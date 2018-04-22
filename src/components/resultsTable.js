import React from 'react';
import {Table} from "reactstrap";


const ResultsTable = (props) => {
    let orderRows;
    let thCells;
    if (props.columns){
        thCells = props.columns.map(column => {
            return (
                <th>{column.text}</th>
            )
        })
    }

    if (props.orders && props.orders.length > 0){
        orderRows = props.orders.map(order =>{
            let orderCells = props.columns.map(column =>{
                return (<td>{order[column.key]}</td>);
            });
            return (
                <tr>
                    {orderCells}
                </tr>
            )
        });
    }

    return (
        <Table>
            <thead>
            <tr>
                {thCells}
            </tr>
            </thead>
            <tbody>
            {orderRows}
            </tbody>
        </Table>
    );
};

export default ResultsTable;