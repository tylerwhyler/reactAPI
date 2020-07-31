import React from "react";
import axios from "axios";
import DropZoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor"

export default class BlogForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            blog_status: "",
            content: "",
            featured_image: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this)

        this.componentConfig = this.componentConfig.bind(this)
        this.djsConfig = this.djsConfig.bind(this)
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this)
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({ featured_image: file })
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    handleRichTextEditorChange(content) {
        this.setState({ content })
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title)
        formData.append("portfolio_blog[blog_status]", this.state.blog_status)
        formData.append("portfolio_blog[content]", this.state.content)

        return formData;
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("https://tyji.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), { withCredentials: true })
        .then(res => {
            this.setState({
                title: "",
                blog_status: "",
                content: ""
            })

            this.props.handleSuccessfulFormSubmission(res.data.portfolio_blog)

        }).catch(err => {
            console.error("submit blog form error", err)
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-column">
                    <input 
                        name="title"
                        placeholder="Title"
                        value={this.state.title} 
                        onChange={this.handleChange} 
                        type="text"
                    />

                    <input 
                        name="blog_status" 
                        placeholder="Blog Status"
                        value={this.state.blog_status} 
                        onChange={this.handleChange} 
                        type="text"
                    />
                </div>
                    
                <div className="one-column">
                    <RichTextEditor 
                        handleRichTextEditorChange={this.handleRichTextEditorChange}
                    />
                </div>

                <div className="image-uploaders">
                    <DropZoneComponent 
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleFeaturedImageDrop()}
                    >
                        <div className="dz-message">Featured Image</div>
                    </DropZoneComponent>
                </div>
                
                <button className="btn">Save</button>

            </form>
        )
    }
}