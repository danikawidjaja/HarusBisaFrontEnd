import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers//Home";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Courses from './containers/Courses';
import Lectures from './containers/Lectures';
import AppliedRoute from './components/AppliedRoute';
import Profile from './containers/Profile';
import Pricing from './containers/Pricing';
import WhyHarusBisa from './containers/WhyHarusBisa';
import Questions from './containers/Questions';
import CourseContent from './containers/CourseContent';
import TermsAndConditions from './containers/TermsAndConditions';
import FAQ from './containers/FAQ';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps}/>
    <AppliedRoute path ="/signup" exact component = {SignUp} props={childProps}/>
    <AppliedRoute path ="/login" exact component = {Login} props={childProps} />
    <AppliedRoute path='/pricing' exact component = {Pricing} props={childProps} />
    <AppliedRoute path='/why' exact component = {WhyHarusBisa} props={childProps} />
    <AppliedRoute path="/courses" component ={Courses} props={childProps}/>
    <AppliedRoute path='/lectures' component={Lectures} props={childProps}/>
    <AppliedRoute path='/profile' component = {Profile} props={childProps} />
    <AppliedRoute path='/questions' component = {Questions} props={childProps} />
    <AppliedRoute path='/coursecontent' component={CourseContent} props={childProps}/>
    <AppliedRoute path='/termsandconditions' component={TermsAndConditions} props={childProps}/>
    <AppliedRoute path='/faq' component={FAQ} props={childProps}/>
    <AppliedRoute component={NotFound} props={childProps}/>
  </Switch>;