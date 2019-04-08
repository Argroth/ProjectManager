import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eng: "This is an Eng example",
            pl: "To jest przykład po polsku",
            selectedLang: '',
            textToShow: ''
        };

    };

    checkLang(){
        if(this.props.selectedLang === 'eng'){
            this.setState({textToShow: this.state.eng});
        }else{
            this.setState({textToShow: this.state.pl});
        }
    }

    componentDidMount() {
        this.checkLang();
    }

    render() {
        return (
            <div>
                {this.state.textToShow}
            </div>
        );
    }
}

export default Test;