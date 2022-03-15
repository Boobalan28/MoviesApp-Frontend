import React from "react";
import Joi from "@hapi/joi";
import { connect } from "react-redux";

import Input from "../../components/common/Input";
import { addMovie } from "../../actions/moviesAction";
import { movieSchema } from "./schema";
import Button from "../../components/common/Button";

class AddMovieForm extends React.Component {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      description: "",
      image: null,
    },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //TODO: Validate property
    const { error } = Joi.validate(this.state, movieSchema);
    this.setState({ errors: error });
    if (!error) this.props.addMovie(this.state.data);
  };

  uploadImage = (e) => {
    if (e.target.files[0]) {
      const data = { ...this.state.data };
      data.image = e.target.files[0];
      this.setState({ data });
    }
  };

  render() {
    const { errors, data } = this.state;
    const { title, genre, numberInStock } = data;

    return (
      <div className="background-container pt-5">
        <div className="container">
          <h1 className="header">Add a new movie</h1>

          <form  encType="multipart/form-data">
            <Input
              name="title"
              value={title}
              label="Title"
              onChange={this.handleChange}
              placeholder="Enter the title..."
              error={errors["title"]}
              iconClass="fas fa-film"
              autoFocus
            />

            <Input
              name="genre"
              label="Genre"
              onChange={this.handleChange}
              placeholder="Enter the type ..."
              value={genre}
              error={errors["genre"]}
              iconClass="fas fa-address-card"
            />

            <Input
              name="numberInStock"
              label="Number Of Stars"
              onChange={this.handleChange}
              placeholder="Enter numbers the stock..."
              error={errors["numberInStock"]}
              iconClass="fas fa-hashtag"
              value={numberInStock}
              type="number"
            />

            <Input
              name="image"
              label="Cover Image"
              onChange={this.uploadImage}
              error={errors["coverImage"]}
              iconClass="fas fa-file-image"
              accept="image/*"
              type="file"
            />

            <Input
              name="description"
              label="Description"
              placeholder="Enter description about this movie..."
              iconClass="fas fa-info"
              error={errors["description"]}
              type="textarea"
            />
            <Button onSubmit={this.handleSubmit} type="submit" label="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dipatch) => {
  return {
    addMovie: (movie) => dipatch(addMovie(movie)),
  };
};

const mapStateToProps = (state) => {
  return {
    genres: state.genre.genres,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieForm);

