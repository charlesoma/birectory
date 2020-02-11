import React, { Component } from 'react';
import { connect } from "react-redux";
import { saveData, getData } from '../actions/actions';
import Header from './Header';

class Home extends Component {
    state = {
        name: '',
        description: '',
        phone: '',
        email: '',
        website: '',
        directories: []
    }

    async componentDidMount() {
        await this.props.getData()
        if (this.props.directories.length > 0) {
            this.setState({
                directories: JSON.parse(this.props.directories).reverse()
            })
        }
    }

    searchHandler = (event) => {
        const directories = JSON.parse(this.props.directories).reverse()
        const results = directories.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLowerCase().includes(event.target.value)));
        this.setState({
            directories: results
        })
    }

    render() {
        const { directories } = this.state
        return (
            <div id='home'>
                <Header />
                <div className='content'>
                    {
                        localStorage.getItem('directories') &&
                        <div className='searchDiv'>
                            <input type="text" placeholder='Search' className="search" onChange={this.searchHandler} />
                        </div>
                    }
                    {
                        directories.map((item, i) => (
                            <div key={i} className='directoryList'>
                                <p>Name: {item.name}</p>
                                <p>Description: {item.description}</p>
                                <p>Phone number: {item.phone}</p>
                                <p>Email: {item.email}</p>
                                <p>Website: {item.website}</p>
                                <div className='catDiv'>Categories: {item.categorySelected && item.categorySelected.map((item, i) => <div key={i} className='category'>{item}</div>)}</div>
                                <img alt='' src={!item.imgUrl ? 'https://via.placeholder.com/160' : item.imgUrl} width={160} height={160} />
                            </div>
                        ))
                    }
                    {
                        directories.length < 1 &&
                        <div className='directoryList'>
                            <p>Oops, nothing to show.</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getData: () => dispatch(getData()),
    saveData: (data) => dispatch(saveData(data))
});

const mapStateToProps = state => ({
    directories: state.data.directories,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
