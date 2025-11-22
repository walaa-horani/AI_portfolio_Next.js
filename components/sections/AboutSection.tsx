import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery, PortableText } from 'next-sanity';
import React from 'react'



const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
    firstName,
    lastName,
    fullBio,
    yearsOfExperience,
    stats,
    email,
    phone,
    location
  }`);
  export async function  AboutSection() {
    const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });



  return (
    <section className='py-20 px-6'>
          <div className='container mx-auto max-w-3xl'>
            

       {/* Title */}

        <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">About Me</h2>
       <p className="text-gray-500">Get to know me better</p>
        </div>   


       {/* Simple Text Bio */}
        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
        <PortableText value={profile.fullBio} />
        </p>
    

          {/* Stats */}
      {profile.stats?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {profile.stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-cyan-800">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}
        </div>  
    </section>
  )
}

export default AboutSection