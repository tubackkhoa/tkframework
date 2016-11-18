import React, { Component, PropTypes } from 'react';
// import { fetchAuthor, updateAuthor } from 'cms/actions/authors';
// import { updateSocialAccount } from 'cms/actions/socialAccounts';
// import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
// import DropzoneImage from 'cms/components/shared/DropzoneImage/index';
import TextField from 'material-ui/TextField';
import TextEditor from 'ui/shared/components/Text/Editor'
// import SocialAccount from 'cms/components/authors/forms/SocialAccount/index';
import ErrorMessage from 'ui/shared/components/ErrorMessage';
import inlineStyles from 'ui/shared/styles/MaterialUI';
const styles = {}

const fields = [
  "id", "name", "image", "description", "introduction"
];

function validate(values) {
  const errors = {};
  if(!values.name) {
    errors.name = "Entry name"
  }
  console.log(errors)
  return errors;
}

class AuthorForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit               = this.handleSubmit.bind(this);
    this.handleUpdateSocialAccount  = this.handleUpdateSocialAccount.bind(this);

  }

  componentDidMount() {
   
  }

  handleSubmit(props) {
    
  }
 
  handleUpdateSocialAccount(sortRank, url) {
  }

  

  renderErrorMessage() {
    if(this.props.errorMessage) {
      return <ErrorMessage message={this.props.errorMessage} />
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { name, image, description, introduction } } = this.props;
    console.log(this.props)
    return (
      <form className={styles.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <h2 className={styles.heading}>Update About</h2>
        <TextField
          {...name}
          floatingLabelText="name"
          hintText="Enter name"
          fullWidth={true}
          style={inlineStyles.textField}
          
        />
        
        
        {this.renderErrorMessage()}
        <button type="submit"
                disabled={submitting}
                className={styles.button}
        >
          Update
        </button>
      </form>

    );
  }
}


export default reduxForm({
  form: "AuthorForm",
  fields,
  validate
})(AuthorForm);