import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {
    login,
    saveData,
    getData,
    saveCategory,
    getCategory,
    deleteData,
    updateData
} from '../actions/actions';
import Header from './Header';

class Dashboard extends Component {
    state = {
        name: '',
        description: '',
        phone: '',
        email: '',
        website: '',
        category: '',
        edit: false,
        index: '',
        imgUrl: '',
        categorySelected: [],
        directories: [],
        categories: []
    }

    async componentDidMount() {
        await this.props.getData()
        await this.props.getCategory()
        this.setState({
            directories: this.props.directories.length > 0 ? JSON.parse(this.props.directories).reverse() : [],
            categories: this.props.categories.length > 0 ? JSON.parse(this.props.categories) : [],
        })
    }

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleCheck = (e) => {
        const categorySelected = this.state.categorySelected
        let index

        if (e.target.checked) {
            categorySelected.push(e.target.value)
        } else {
            index = categorySelected.indexOf(e.target.value)
            categorySelected.splice(index, 1)
        }

        this.setState({ categorySelected: categorySelected })
    }

    updateDirectory = async (e) => {
        e.preventDefault()
        const { name, description, phone, email, website, categorySelected, index, imgUrl } = this.state;
        if (name === '' || description === '' || phone === '' || email === '' || website === '' || categorySelected === []) {
            return
        }

        if (this.state.edit) {
            await this.props.updateData({ name, description, phone, email, website, imgUrl, categorySelected }, index)
        } else {
            await this.props.saveData({ name, description, phone, email, website, imgUrl, categorySelected })
        }

        this.setState({
            edit: false,
            name: '',
            description: '',
            phone: '',
            email: '',
            website: '',
            imgUrl: '',
            index: ''
        })
        this.componentDidMount()
    }

    createCategory = async (e) => {
        e.preventDefault()
        const { category } = this.state;
        if (category === '') {
            return
        }

        await this.props.saveCategory({ category })
        this.componentDidMount()
    }

    deleteDirectory = (i) => {
        this.props.deleteData(i)
        this.componentDidMount()
    }

    editDirectory = (i, item) => {
        this.setState({
            edit: true,
            name: item.name,
            description: item.description,
            phone: item.phone,
            email: item.email,
            website: item.website,
            index: i
        })
    }

    render() {
        const {
            directories,
            categories,
            name,
            description,
            phone,
            email,
            website,
            edit,
            imgUrl
        } = this.state
        const token = localStorage.getItem('token');
        if (token !== 'token') {
            return <Redirect to={"/login"} />;
        }
        return (
            <div id='home'>
                <Header />
                <div className='content'>
                    <div className='forms'>
                        <form onSubmit={this.updateDirectory}>
                            <input className='input' placeholder='Enter name' type={'text'} value={name} onChange={text => this.handleChange("name", text)} />
                            <input className='input' placeholder='Enter description' type={'text'} value={description} onChange={text => this.handleChange("description", text)} />
                            <input className='input' placeholder='Enter phone number' type={'text'} value={phone} onChange={text => this.handleChange("phone", text)} />
                            <input className='input' placeholder='Enter email' type={'text'} value={email} onChange={text => this.handleChange("email", text)} />
                            <input className='input' placeholder='Enter website' type={'text'} value={website} onChange={text => this.handleChange("website", text)} />
                            <input className='input' placeholder='Enter image url' type={'text'} value={imgUrl} onChange={text => this.handleChange("imgUrl", text)} />
                            <div className='categories'>
                                {
                                    categories.map((item, i) => (
                                        <div key={i} className='category'>
                                            <p>{item.category}</p>
                                            <input value={item.category} onChange={this.handleCheck} type='checkbox' />
                                        </div>
                                    ))
                                }
                                {
                                    categories.length < 1 &&
                                    <p className='empty'>Create categories on the right</p>
                                }
                            </div>
                            <input className='input' type={'submit'} value={edit ? 'Edit listing' : 'Create listing'} />
                        </form>
                        <form onSubmit={this.createCategory}>
                            <input className='input' placeholder='Enter category' type={'text'} onChange={text => this.handleChange("category", text)} />
                            <input className='input' type={'submit'} value="Create category" />
                        </form>
                    </div>
                    {
                        directories.map((item, i) => (
                            <div key={i} className='directoryList'>
                                <div className='delete' onClick={() => this.deleteDirectory(i)}>&times;</div>
                                <div className='edit' onClick={() => this.editDirectory(i, item)}>Edit</div>
                                <p>Name: {item.name}</p>
                                <p>Description: {item.description}</p>
                                <p>Phone number: {item.phone}</p>
                                <p>Email: {item.email}</p>
                                <p>Website: {item.website}</p>
                                <div className='catDiv'>Categories: {item.categorySelected && item.categorySelected.map((item, i) => <div key={i} className='category'>{item}</div>)}</div>
                                <img alt='' src ={!item.imgUrl ? 'https://via.placeholder.com/160' : item.imgUrl} width={160} height={160} />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data)),
    getData: () => dispatch(getData()),
    saveData: (data) => dispatch(saveData(data)),
    saveCategory: (data) => dispatch(saveCategory(data)),
    getCategory: () => dispatch(getCategory()),
    deleteData: (data) => dispatch(deleteData(data)),
    updateData: (data, i) => dispatch(updateData(data, i))
});

const mapStateToProps = state => ({
    directories: state.data.directories,
    categories: state.data.categories
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
