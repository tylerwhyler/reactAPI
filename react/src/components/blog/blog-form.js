import React from "react";
import axios from "axios";
import DropZoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor"

export default class BlogForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            title: "",
            blog_status: "",
            content: "",
            featured_image: "",
            apiUrl: "https://tyji.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this)

        this.componentConfig = this.componentConfig.bind(this)
        this.djsConfig = this.djsConfig.bind(this)
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this)
        this.deleteImage = this.deleteImage.bind(this)

        this.featuredImageRef = React.createRef()
    }

    deleteImage(imageType) {
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`, { withCredentials: true })
        .then(res => {
            console.log(res, "delete image")
            // TODO (DONE) update parent component by calling function written and
            //             passed in parent component, from child component
            this.props.handleFeaturedImageDelete()
        }).catch(err => {
            console.error("delete image error", err)
        })
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,
                apiUrl: `https://tyji.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: "patch"
            })
        }
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

        if (this.state.featured_image) {
            formData.append("portfolio_blog[featured_image]", this.state.featured_image)
        }

        return formData;
    }

    handleSubmit(e) {
        e.preventDefault();
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        }).then(res => {
            if (this.state.featured_image) {
                this.featuredImageRef.current.dropzone.removeAllFiles();
            }

            this.setState({
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
            })

            if (this.props.editMode) {
                // Update blog detail
                this.props.handleUpdateFormSubmission(res.data.portfolio_blog)
            } else {
                this.props.handleSuccessfulFormSubmission(res.data.portfolio_blog)
            }

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
                        editMode={this.props.editMode}
                        contentToEdit={this.props.editMode && this.props.blog.content ?
                         this.props.blog.content : null
                        }
                    />
                </div>

                <div className="image-uploaders">
                    {this.props.editMode && this.props.blog.featured_image_url ?
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.props.blog.featured_image_url} />
                        <div className="image-removal-link">
                            <a onClick={() => this.deleteImage("featured_image")}>Remove image</a>
                        </div>
                    </div> :
                    <DropZoneComponent
                        ref={this.featuredImageRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleFeaturedImageDrop()}
                    >
                        <div className="dz-message">Featured Image</div>
                    </DropZoneComponent>}
                </div>
                
                <button className="btn">Save</button>

            </form>
        )
    }
}