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
      <section className="bg-white py-10">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="w-full lg:w-[380px] lg:shrink-0">
              <BookYourCar />
            </div>

            <div className="w-full min-w-0 flex-1">
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
