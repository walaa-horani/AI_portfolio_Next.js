import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/live'
import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import React from 'react'
import { BackgroundBeams } from '../ui/background-beams'


const HERO_QUERY = defineQuery(`
   *[_id == "singleton-profile"][0]{
    firstName,
    lastName,
    headline,
    headlineStaticText,
    shortBio,
    fullBio,
    email,
    
    location,
    yearsOfExperience,
    stats,
    phone,
    profileImage,
    socialLinks

  }
  
  
  `)

  export async function HeroSection() {

  const {data: profile} = await sanityFetch({query:HERO_QUERY})
  console.log(profile)
  if (!profile) return <div>No profile found</div>

  return (
    <section className='relative   max-w-6xl w-full mx-auto  grid grid-cols-1 md:grid-cols-2 gap-5 mt-16'>

      
     <BackgroundBeams className="absolute inset-0 -z-10 pointer-events-none"/>

    
      <div className='flex flex-col items-center z-10'>
      <h1 className='text-4xl text-cyan-800 font-bold'>{profile?.firstName} {profile?.lastName}</h1>
     
      <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground mt-2 font-medium">
              {profile.headline}
           </p>

     <p className='text-gray-500 text-sm mt-2'>{profile?.shortBio}</p>

     <div className='flex gap-3 mt-6'>

      {profile?.socialLinks?.github && (
        <div className='shadow-md p-2.5 rounded-2xl transition hover:bg-gray-200'>
          <Link className='text-cyan-800 font-bold' href={profile.socialLinks.github}>Github</Link>
        </div>
      )}

      {profile?.socialLinks?.youtube && (
        <div className='shadow-md p-2.5 rounded-2xl transition hover:bg-gray-200'>
          <Link className='text-cyan-800 font-bold' href={profile.socialLinks.youtube}>YouTube</Link>
        </div>
      )}

      {profile?.socialLinks?.website && (
        <div className='shadow-md p-2.5 rounded-2xl transition hover:bg-gray-200'>
          <Link className='text-cyan-800 font-bold' href={profile.socialLinks.website}>Personal Web</Link>
        </div>
      )}

      {profile?.socialLinks?.X && (
        <div className='shadow-md p-2.5 rounded-2xl transition hover:bg-gray-200'>
          <Link className='text-cyan-800 font-bold' href={profile.socialLinks.X}>Twitter</Link>
        </div>
      )}
     </div>
      
     <div className='flex items-center mt-7 gap-4'>
      

     {profile.email && (
                  <div className="flex items-center ">
                    <span>📧</span>
                    <span  className="truncate text-sm text-gray-500">{profile.email}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center">
                    <span>📍</span>
                    <span className='text-sm text-gray-500'>{profile.location}</span>
                  </div>
                )}
        
    </div>
      
      </div>

      
    
      
         
      <div className="flex justify-center">
        {profile.profileImage && (
          <img
            src={urlFor(profile.profileImage).url()}
            alt="Profile"
           className='w-96'
          />
        )}
      </div>
        

       
    </section>
  )
}

