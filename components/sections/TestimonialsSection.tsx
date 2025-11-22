import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery } from 'next-sanity';
import React from 'react'
import { urlFor } from '@/sanity/lib/image';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import type { Testimonial } from '@/sanity.types';

type TestimonialQueryResult = Pick<Testimonial, 'name' | 'company' | 'testimonial' | 'avatar'>;

const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  company,
  testimonial,
  rating,
  date,
  avatar,
}`);

export async function TestimonialsSection() {
    const {data: testimonials } = await sanityFetch({
        query: TESTIMONIALS_QUERY
    })

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    // Map Sanity testimonials to AnimatedTestimonials format
    const mappedTestimonials = (testimonials as TestimonialQueryResult[]).map((testimonial) => ({
        quote: testimonial.testimonial || '',
        name: testimonial.name || '',
        designation: testimonial.company || '',
        src: testimonial.avatar 
            ? urlFor(testimonial.avatar).width(500).height(500).url()
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // fallback image
    }));

  return (
    <section className="py-20">

<div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            What people say about working with me
          </p>
        </div>
      <AnimatedTestimonials testimonials={mappedTestimonials} autoplay={true} />
      </div>
    </section>
  )
}
