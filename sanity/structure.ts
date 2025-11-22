import {
  AsteriskIcon,
  BookIcon,
  CaseIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentIcon,
  DocumentsIcon,
  ProjectsIcon,
  RocketIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      // ------------------------------------
      // PROFILE (Singleton)
      // ------------------------------------
      S.listItem()
        .title("Profile")
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType("profile")
            .documentId("singleton-profile")
        ),

      S.divider(),

      // ------------------------------------
      // PORTFOLIO SECTION
      // ------------------------------------
      S.listItem()
        .title("Portfolio")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Portfolio Content")
            .items([
              S.listItem()
                .title("Projects")
                .icon(ProjectsIcon)
                .schemaType("project")
                .child(S.documentTypeList("project").title("Projects")),

              S.listItem()
                .title("Skills")
                .icon(AsteriskIcon)
                .schemaType("skill")
                .child(S.documentTypeList("skill").title("Skills")),

              S.listItem()
                .title("Services")
                .icon(TagIcon)
                .schemaType("service")
                .child(S.documentTypeList("service").title("Services")),
            ])
        ),

      S.divider(),

      // ------------------------------------
      // PROFESSIONAL BACKGROUND
      // ------------------------------------
      S.listItem()
        .title("Professional Background")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Professional Background")
            .items([
              S.listItem()
                .title("Work Experience")
                .icon(CaseIcon)
                .schemaType("experience")
                .child(S.documentTypeList("experience").title("Work Experience")),

              S.listItem()
                .title("Education")
                .icon(BookIcon)
                .schemaType("education")
                .child(S.documentTypeList("education").title("Education")),

              S.listItem()
                .title("Certifications")
                .icon(DocumentIcon)
                .schemaType("certification")
                .child(S.documentTypeList("certification").title("Certifications")),

              S.listItem()
                .title("Achievements & Awards")
                .icon(StarIcon)
                .schemaType("achievement")
                .child(
                  S.documentTypeList("achievement").title("Achievements & Awards")
                ),
            ])
        ),

      S.divider(),

     
    
      // Testimonials 
      // ------------------------------------
      S.listItem()
        .title("Testimonials")
        .icon(CommentIcon)
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonials")),

      S.divider(),

      // ------------------------------------
      // CONTACT (No status since you removed it)
      // ------------------------------------
      S.listItem()
        .title("Contact Form Submissions")
        .icon(DocumentsIcon)
        .schemaType("contact")
        .child(S.documentTypeList("contact").title("Contact Messages")),

      S.divider(),

      // ------------------------------------
      // NAVIGATION
      // ------------------------------------
      S.listItem()
        .title("Navigation Links")
        .icon(DocumentsIcon)
        .schemaType("navigation")
        .child(S.documentTypeList("navigation").title("Navigation Links")),

      S.divider(),

      // ------------------------------------
      // SITE SETTINGS (Singleton)
      // ------------------------------------
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("singleton-siteSettings")
        ),
    ]);
