import React from 'react';

function List(props) {
    return <div>
    <h4 className="ui dividing header"> Product List </h4>
    <table className="ui celled table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Count</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                props.productItems.map(item => {
                    return (
                        <tr key={item.id}>
                            <td data-label="Name"> {item.name} </td>
                            <td data-label="Count"> {item.count} </td>
                            <td data-label="Price"> {item.price} </td>
                            <td data-label="Total"> {item.price * item.count} </td>
                        </tr>  
                    )
                })
            }
        </tbody>
        <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>{props.total}</th>
            </tr>
        </tfoot>
    </table>
</div> 
}

export default List