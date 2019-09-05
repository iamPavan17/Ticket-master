import React, { Component } from 'react'
import { MDBBtn } from 'mdbreact'
import axios from '../config/axios'
import Select from 'react-select';

export class Form extends Component {
    constructor() {
        super() 
        this.state = {
            customersData: [],
            departmentsData: [],
            employeesData: [],
            filteredEmployees: [],
            customer: '',
            department: '',
            employee: '',
            priority: '',
            message: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response => {
            // console.log(response.data)
            let customersData = response.data;
            this.setState({ customersData });
            // console.log(this.state.customersData);
        });

        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response => {
            let departmentsData = response.data;
            this.setState({ departmentsData });
            console.log(this.state.departmentsData)
        })

        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response => {
            let employeesData = response.data;
            this.setState({ employeesData });
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        var result = this.state.employeesData.filter(employee => {
            return employee.department.name === this.state.department;
        });
        // console.log(result);
        this.setState({ filteredEmployees: result })
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = {
            department: this.state.department,
            customer: this.state.customer,
            employee: this.state.employee,
            priority: this.state.priority,
            message: this.state.message
        }
        console.log(formData)
        this.props.handleSubmit(formData); 
    }

    render() {
        return (
            <div>
                <h3>Add Ticket</h3>
                    <form onSubmit={this.handleSubmit}>
                        {/* <Select
                            name={department}
                            onChange={this.handleChange}
                            options={this.state.departmentsData.map(department => {
                                return {value: department.name, label: department.name}
                            })}
                        /> */}

                        Department: <select name='department' onChange={this.handleChange} className="browser-default custom-select">
                                <option value=''>Select Department</option>
                                {this.state.departmentsData.map(department => {
                                    return (
                                        <option key={department._id} value={department.name}>{department.name}</option>
                                    )
                                })}
                            </select><br/>
                        Customer Name: <select name='customer' onChange={this.handleChange} className="browser-default custom-select">
                            <option value=''>Select Customer</option>
                            {this.state.customersData.map(customer => {
                                return (
                                    <option key={customer._id} value={customer.name}>{customer.name}</option>
                                )
                            })}
                            </select><br/>
                        Empolyee Name: <select name='employee' onChange={this.handleChange} className="browser-default custom-select">
                            <option value=''>Select Employee</option>
                            {this.state.filteredEmployees.map(employee => {
                                return (
                                    <option key={employee._id} value={employee.name}>{employee.name}</option>
                                )
                            })}
                            </select><br/>
                        Priority: <input type='radio' name='priority' value='High' onChange={this.handleChange}/> High
                        <input type='radio' name='priority' value='Medium' onChange={this.handleChange} /> Medium
                        <input type='radio' name='priority' value='Low' onChange={this.handleChange} /> Low
                        <br />
                        Message: <textarea name='message' onChange={this.handleChange} className="form-control"/> <br/>
                        <MDBBtn color="primary" type='submit' value='Submit' onChange={this.handleChange}>Submit</MDBBtn>
                        <MDBBtn color="primary" type='reset' value='Submit' onChange={this.handleChange}>Reset</MDBBtn>
                    </form>
            </div>
        )
    }
}

export default Form
