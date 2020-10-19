import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const Login = () => (

<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
    </Header>
    <Form size='large'>
        <Segment stacked>
        <Form.Input 
            fluid icon='user' iconPosition='left' placeholder='Username' name='email'/>
        <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            name='password'
            placeholder='Password'
            type='password'
        />
        <NavLink to="/todolist">
            <Button color='teal' fluid size='large' type="submit" >
                Login
            </Button>
        </NavLink>
        </Segment>
    </Form>
    </Grid.Column>
</Grid>
);

export default Login