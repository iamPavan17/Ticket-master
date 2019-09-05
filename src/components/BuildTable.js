import React from 'react'
import { MDBTableBody } from 'mdbreact'

export default function BuildTable(props) {
    
    return (
        <MDBTableBody>
            {props.search === 'All' ? props.tickets.map((filtered, index) => {
                return (
                    <tr key={index}>    
                        <td>{ index + 1 } </td>
                        <td>{filtered.customer}</td>
                        <td>{filtered.employee}</td>
                        <td>{filtered.department}</td>
                        <td>{filtered.priority}</td>
                        <td>{filtered.message}</td>
                    </tr>
                )
            }) : props.event === 'change' ? props.tickets.filter(ticket => {
                return ticket.customer.toLowerCase().indexOf(props.search.toLowerCase()) >= 0
            }).map((filtered, index) => {
                return (
                    <tr key={index}>    
                        <td>{ index + 1 } </td>
                        <td>{filtered.customer}</td>
                        <td>{filtered.employee}</td>
                        <td>{filtered.department}</td>
                        <td>{filtered.priority}</td>
                        <td>{filtered.message}</td>
                    </tr>
                )
            }): props.tickets.filter(ticket => {
                return ticket.priority === (props.search)
            }).map((filtered, index) => {
                return (
                    <tr key={index}>    
                        <td>{ index + 1 } </td>
                        <td>{filtered.customer}</td>
                        <td>{filtered.employee}</td>
                        <td>{filtered.department}</td>
                        <td>{filtered.priority}</td>
                        <td>{filtered.message}</td>
                    </tr>
                )
            }) }
        </MDBTableBody>
    )
}
