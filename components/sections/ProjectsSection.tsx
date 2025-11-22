import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery } from 'next-sanity';
import React from 'react'
const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" ] | order(order asc) {
    title,
    slug,
    tagline,
    coverImage,
    technologies[]->{
      name,
      color
    },
    category,
    liveDemo,
    githubUrl
  }
`);

export async function ProjectsSection() {
 
  const {data: projects} = await sanityFetch({ query: 
    PROJECTS_QUERY });
    console.log(projects)
    if (!projects) return <div>No projects found</div>
  
  
  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-cyan-800 font-bold mb-2">Featured Projects</h2>
          <p className="text-xl text-muted-foreground">
            Some of my best work
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-card"
            >
              {/* Category Badge */}
              <div className="text-sm  text-white bg-cyan-500 px-3 py-1 rounded-full inline-block mb-3">
                {project.category}
              </div>

              {/* Title */}
              <h3 className="text-2xl  text-cyan-800 font-bold mb-2">{project.title}</h3>

              {/* Tagline */}
              <p className="text-muted-foreground mb-4">{project.tagline}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies?.map((tech: any, i: number) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 bg-muted rounded-full"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                {project.liveDemo && (
                  <a
                    className="px-4 py-2 bg-cyan-800 text-white rounded-lg font-medium"
                    href={project.liveDemo}
                    target="_blank"
                  >
                    Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    className="text-sm underline text-muted-foreground"
                    href={project.githubUrl}
                    target="_blank"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
