import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  // componentDidMount() {
  //   // Trigger slickNext() method on the slider every 2 seconds
  //   setInterval(() => {
  //     this.myRef.current.slickNext();
  //   }, 2000);
  // }
  
  render() {
    const { imageNames } = this.props; // Get the list of image names from props

    const settings = {

      centerMode: true,
      variableWidth: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false
    };

    return (
      <div >
        <Slider  ref={this.myRef} {...settings} >
          {imageNames.map((imageName, index) => (

            <div className="myimage">
              <img
                src={'myimages/'+`${imageName}.png`} // Constructing image source using template literal
                alt={`Slide ${index + 1}`}
                width="100%"
                height="auto"
              />
            </div>

          ))}

        </Slider>
            <button onClick={() => this.myRef?.current?.slickPrev()} className="leftarrow" >
            <img src="myimages/arrow-right.svg" />
            </button>
            <button onClick={() => this.myRef?.current?.slickNext()} className="rightarrow">
            <img src="myimages/arrow-left.svg" />
            </button>
      </div>
    );
  }
}
