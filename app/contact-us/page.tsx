import Contactsiper from '@/components/Contacthome'
import ContactInfoBar from '@/components/ContactInfoBar'
import BookYourCar from '@/components/Contactinput'
import LatestBlogPosts from '@/components/ContactLatestBlogPosts'
import ContactSwipercard from '@/components/Contactuscardswereg'
import React from 'react'

const ContactUs = () => {
  return (
    <div>
      <Contactsiper />
      <section className=" bg-white py-10">
        <div className="mx-auto max-w-[1400px] px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[380px] shrink-0">
              <BookYourCar />
            </div>

            <div className="w-[850px] flex-1">
              <ContactSwipercard />
            </div>
          </div>
        </div>
      </section>
      <ContactInfoBar/>
      <LatestBlogPosts/>
    </div>
  )
}

export default ContactUs
