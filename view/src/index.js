import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './router';



const MainTemplateWithRouter = (
<div>
    <AppRouter />
</div>
);



ReactDOM.render(MainTemplateWithRouter, document.querySelector('#root'));