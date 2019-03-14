import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import SignUp from "./containers/SignUp/SignUp";
import Login from "./containers/Login/Login";
import NotFound from "./containers/NotFound";
import Courses from './containers/Courses';
import Lectures from './containers/Lectures';
import AppliedRoute from './components/AppliedRoute';
import Profile from './containers/Profile';
import Questions from './containers/Questions';
import CourseContent from './containers/CourseContent';
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import FAQ from './containers/FAQ';
import ContactUs from './containers/ContactUs';
import ForgetPassword from './containers/ForgetPassword';
import Dashboard from './containers/Dashboard';
 
export default ({ childProps }) =>
  <Switch>
        <AppliedRoute path="/home" exact component={Home} props={childProps}/>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path ="/signup" exact component = {SignUp} props={childProps}/>
        <AppliedRoute path ="/login" exact component = {Login} props={childProps} />
        <AppliedRoute path="/courses" component ={Courses} props={childProps}/>
        <AppliedRoute path='/dashboard' component={Dashboard} props={childProps}/>
        <AppliedRoute path='/profile' component = {Profile} props={childProps} />
        <AppliedRoute path='/questions' component = {Questions} props={childProps} />
        <AppliedRoute path='/coursecontent' component={CourseContent} props={childProps}/>
        <AppliedRoute path='/termsandconditions' component={TermsAndConditions} props={childProps}/>
        <AppliedRoute path='/faq' component={FAQ} props={childProps}/>
        <AppliedRoute path='/contactus' component={ContactUs} props={childProps}/>
        <AppliedRoute path='/forgetpassword' component={ForgetPassword} props={childProps}/>
        <AppliedRoute component={NotFound} props={childProps}/>
  </Switch>;