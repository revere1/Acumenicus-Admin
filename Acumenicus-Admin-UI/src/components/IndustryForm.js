import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_INDUSTRY = gql`
    mutation AddIndustry(
        $industryname: String!,
        $status: String!){
            addIndustry(
                industryname: $industryname,
                status: $status) {
                _id
            }
    }
`;

class IndustryForm extends Component {

    render() {
        let industryname, status;
        console.log('asdasd', industryname)
        return (
            <Mutation mutation={ADD_INDUSTRY} onCompleted={() => this.props.history.push('/')}>

                {(addIndustry, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    ADD INDUSTRY
                            </h3>
                            </div>
                            <div className="panel-body">
                                <h4><Link to="/" className="btn btn-primary">INDUSTRY LIST</Link></h4>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addIndustry({
                                        variables: {
                                            industryname: industryname.value,
                                            status: status.value
                                        }
                                    });
                                    industryname.value = "";
                                    status.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="isbn">Industry Name:</label>
                                        <input type="text" className="form-control" name="industryname" ref={node => {
                                            industryname = node;
                                        }} placeholder="industry Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Status:</label>
                                        <input type="text" className="form-control" name="status" ref={node => {
                                            status = node;
                                        }} placeholder="status" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default IndustryForm;