import React from 'react'
import Slider from "react-slick";
import './App.css'



const institutesData = [
  {
    id: 1,
    name: 'Example University 1',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 2,
    name: 'Example University 2',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 3,
    name: 'Example University 3',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 4,
    name: 'Example University 4',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 5,
    name: 'Example University 5',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 6,
    name: 'Example University 6',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 7,
    name: 'Example University 7',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 8,
    name: 'Example University 8',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 25,
    name: 'Example University 9',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 26,
    name: 'Example University 10',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 27,
    name: 'Example University 11',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  //Colleges
  {
    id: 9,
    name: 'Example College 1',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 10,
    name: 'Example College 2',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 11,
    name: 'Example College 3',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 12,
    name: 'Example College 4',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 13,
    name: 'Example College 5',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 14,
    name: 'Example College 6',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 15,
    name: 'Example College 7',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 16,
    name: 'Example College 8',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  //Schools
  {
    id: 17,
    name: 'Example Schools 1',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 18,
    name: 'Example Schools 2',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 19,
    name: 'Example Schools 3',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 20,
    name: 'Example Schools 4',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 21,
    name: 'Example Schools 5',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 22,
    name: 'Example Schools 6',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 23,
    name: 'Example Schools 7',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 24,
    name: 'Example Schools 8',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 29,
    name: 'Example Schools 9',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 39,
    name: 'Example Schools 10',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 30,
    name: 'Example Schools 11',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 31,
    name: 'Example Schools 14',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },{
    id: 32,
    name: 'Example Schools 13',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 33,
    name: 'Example Schools 15',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
];


export default function Test() {



    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
  return (
    <div >

      <Slider {...settings}>
        <div className='t4'>
          <h3>1</h3>
          <div>2</div>
        </div>
        <div className='t4'>
          <h3>1</h3>
          <div>2</div>
        </div>
        <div className='t4'>
          <h3>1</h3>
          <div>2</div>
        </div>
        <div className='t4'>
          <h3>1</h3>
          <div>2</div>
        </div>
      </Slider>
    </div>
  );
}
