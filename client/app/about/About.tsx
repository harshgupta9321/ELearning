import React from 'react'
import { styles } from '../Style/style'

type Props = {}

const About = (props: Props) => {
  return (
    <div className=' dark:text-white text-black'>
        <br />
        <h1 className={`${styles.title} 800px:!text-[45px]`}>
            What is <span className='text-[#4141eb]'>ELearning</span>
        </h1>
        <br />
        <div className="w-[95%] 800px:w-[85%] m-auto">
            <p className='text-[18px] font-Poppins '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam commodi corporis maxime vel dolorem nostrum minima harum corrupti, dicta dolor modi earum, libero mollitia exercitationem sapiente ab suscipit! Dolorum, incidunt.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores earum optio quaerat non ratione deserunt debitis aliquid. Cum quam obcaecati nobis magnam, dignissimos maiores excepturi doloribus corporis. In, repellendus praesentium!
                <br />
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, autem esse. Odit culpa esse ullam doloribus provident exercitationem odio, aut, hic atque error nulla voluptas velit minima excepturi voluptate necessitatibus?
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo laborum soluta molestias in, tenetur numquam nulla corporis dolorem ratione neque, eligendi odio minus possimus deleniti sed illo iste ex omnis.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo laborum soluta molestias in, tenetur numquam nulla corporis dolorem ratione neque, eligendi odio minus possimus deleniti sed illo iste ex omnis.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo laborum soluta molestias in, tenetur numquam nulla corporis dolorem ratione neque, eligendi odio minus possimus deleniti sed illo iste ex omnis.

            </p>
            <br />
            <span className='font-mono text-[22px]'>HarshGupta-</span>
            <br />
            <h5 className='text-[18px] font-Poppins'>
                Founder and CEO of ELearning
            </h5>
            <br />
            
           
        </div>
    </div>
  )
}

export default About