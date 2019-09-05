import React, { Component } from 'react'
import Form from './Form'
import BuildTable from './BuildTable';
import { MDBTable, MDBTableHead, MDBBtnGroup, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBProgress  } from 'mdbreact';
import Chart from 'react-google-charts';
import Button from '@material-ui/core/Button';

export class List extends Component {
    constructor() {
        super()
        this.state = {
            tickets: JSON.parse(localStorage.getItem('tickets')),
            search: 'All',
            event: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleChange(e) {
        let search = e.target.value;
        this.setState({ search })
        let event = 'change';
        this.setState({ event });
    }

    handleButton(e) {
        let search = e.target.value
        this.setState({ search })
        console.log(e.target)
        let event = 'click';
        this.setState({ event })
    }

    handleSubmit(formData) {
        let tickets = JSON.parse(localStorage.getItem('tickets')) || []
        tickets.push(formData);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        this.setState(prevState => ({
            tickets: [...prevState.tickets, formData]
        }));
    }

    render() {

        var High = ['High', 0];
        var Medium = ['Medium', 0];
        var Low = ['Low', 0];
    
        this.state.tickets.forEach(ticket => {
            if(ticket.priority === High[0]) {
                High[1] += 1; 
            } else if(ticket.priority === Medium[0]) {
                Medium[1] += 1;
            } else {
                Low[1] += 1;
            }
        });

        var Sales = ['Sales', 0];
        var Technical = ['Technical', 0];
        var HR = ['HR', 0];
        var Research = ['Research and Development', 0];
        var Security = ['Security', 0];

        this.state.tickets.forEach(ticket => {
            if(ticket.department === Sales[0]) {
                Sales[1] += 1; 
            } else if(ticket.department === Technical[0]) {
                Technical[1] += 1;
            } else if(ticket.department === HR[0]) {
                HR[1] += 1;
            } else if(ticket.department === Research[0]) {
                Research[1] += 1;
            } else {
                Security[1] += 1;
            }
        });

        return (
            <MDBContainer className='pt-5'>
                <MDBRow>
                    <MDBCol md="8">
                        <h2 className='pb-2'>Listing tickets - {this.state.tickets.length}</h2>
                        <MDBRow>
                            <MDBCol md="8">
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="primary" onClick={this.handleButton} value="All" name="all">All</MDBBtn>
                                    <MDBBtn color="primary" onClick={this.handleButton} value="High" name="high">High</MDBBtn>
                                    <MDBBtn color="primary" onClick={this.handleButton} value="Medium" name="medium">Medium</MDBBtn>
                                    <MDBBtn color="primary" onClick={this.handleButton} value="Low" name="low">Low</MDBBtn>
                                </MDBBtnGroup>
                                {/* <input type='button' value='All' name='All' onClick={this.handleButton} />
                                <input type='button' value='High' name='High' onClick={this.handleButton} />
                                <input type='button' value='Medium' name='Medium' onClick={this.handleButton} />
                                <input type='button' value='Low' name='Low' onClick={this.handleButton} /> */}
                            </MDBCol>
                            <MDBCol md="4" className='mb-2'>
                                <input type='text' name='search' id='search' label='search by customer name' onChange={this.handleChange} placeholder="search by name" className="form-control"/>
                            </MDBCol>
                        </MDBRow>
                        <MDBTable>
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    <th>#</th>
                                    <th>Customer Name</th>
                                    <th>Employee Name</th>
                                    <th>Dept. Name</th>
                                    <th>Priority</th>
                                    <th>Message</th>
                                </tr>
                            </MDBTableHead>
                            <BuildTable tickets = {this.state.tickets} search={this.state.search} event={this.state.event}/>
                        </MDBTable> <br />

                        <MDBProgress material value={25} className="my-s" />
                        
                        <MDBRow>
                            <MDBCol md="6">
                                <h2 className="pt-3">Some Stats</h2>
                                <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Task', 'Hours per Day'],
                                    ['High', High[1]],
                                    ['Medium', Medium[1]],
                                    ['Low', Low[1]]
                                ]}
                                options={{
                                    title: 'Ticket Priority %',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                                />
                            </MDBCol>
                            <MDBCol md="6">
                                <br /><br />
                                <Chart
                                    width={'400px'}
                                    height={'200px'}
                                    chartType="BarChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        [
                                        'Element',
                                        'Total',
                                        { role: 'style' },
                                        {
                                            sourceColumn: 0,
                                            role: 'annotation',
                                            type: 'string',
                                            calc: 'stringify',
                                        },
                                        ],
                                        ['Sales', Sales[1], 'red', null],
                                        ['Technical', Technical[1], 'orange', null],
                                        ['HR', HR[1], 'red', null],
                                        ['Research and Development', Research[1], 'silver', null],
                                        ['Security', Security[1], 'brown', null]
                                    ]}
                                    options={{
                                        title: 'Tickets by Department',
                                        width: 400,
                                        height: 300,
                                        bar: { groupWidth: '90%' },
                                        legend: { position: 'none' },
                                    }}
                                    // For tests
                                    rootProps={{ 'data-testid': '6' }}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="4">
                        <Form handleSubmit = {this.handleSubmit}/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default List
