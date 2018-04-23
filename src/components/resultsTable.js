import React from 'react';
import {Table} from "reactstrap";
import {Link} from "react-router-dom";


const ResultsTable = (props) => {
    let orderRows;
    let thCells;
    if (props.columns){
        thCells = props.columns.map((column, index) => {
            return (
                <th key={index +'b'}>{column.text}</th>
            )
        })
        thCells.push((<th />));
    }

    if (props.orders && props.orders.length > 0){
        orderRows = props.orders.map((order, outerIndex) =>{
            let orderCells = props.columns.map((column, index) =>{
                let cellText = order[column.key];
                if (column.key ==="Date"){
                    cellText = new Date(cellText).toLocaleDateString('en-GB',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
                }
                return (<td key={index+'c'}>{cellText}</td>);
            });
            return (
                <tr key={outerIndex+'a'}>
                    {orderCells}
                    <td><Link to={'/order/' + order.ESPOrderNo}>view details</Link></td>
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