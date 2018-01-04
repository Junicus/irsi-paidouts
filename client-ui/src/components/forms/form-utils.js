import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const FormUtils = {
  Input: ({ showErrors, errorText, ...props }) => (
    <div>
      <Form.Input {...props} />
      {
        (showErrors && errorText !== '') ?
          <div>
            <span>{errorText}</span>
          </div> : null
      }
    </div>
  ),
  Select: ({ showErrors, errorText, ...props }) => (
    <div>
      <Form.Select {...props} />
      {
        (showErrors && errorText !== '') ?
          <div>
            <span>{errorText}</span>
          </div> : null
      }
    </div>
  )
}

export default FormUtils;
