## Linknest

This is a completely educational project that aims to build a minimal version of a “personal link hub”, where users can manage and share a set of curated links through a public-facing profile page.

https://linknest-seven.vercel.app/

## Summary of implemented features

- Authentication
  - Login
  - Sign Up
  - Logout
- Link management
  - Create links
  - Edit links
  - Remove links
- Public user page
- Homepage

## Scope decisions and key trade-offs

- Prioritized Scalable Architecture:
  I focused early efforts on designing a modular, scalable project structure. This decision aimed to simplify testing, support long-term maintainability, and make the app more adaptable to future feature growth.

- Leveraged Modern React and Next.js Capabilities:
  I utilized recent advancements such as React Server Components, Next.js App Router, and built-in data fetching mechanisms to build a robust foundation, improve performance, and reduce the need for additional libraries.

- Adopted Tailwind CSS and shadcn/ui for UI Development:
  To speed up development while keeping the design system flexible, I used Tailwind and shadcn/ui. This allowed me to ship components quickly and maintain consistency, while retaining the ability to easily customize or replace components as the product evolves.

- Scoped Feature Set to Core Functionality:
  Due to the time constraints, I deprioritized advanced features in favor of ensuring that the core user flows were functional, polished, and testable.

- Implemented Lightweight Authentication:
  Instead of integrating a full-featured solution like NextAuth, I opted for a lightweight, custom authentication system. This approach provided enough flexibility and control.

## Setup and run instructions

For local development, clone the repository and:

1. Run `npm install` to install dependencies
2. Run `npm run start:emulator` to build the Firebase Emulator image and start the container
3. Run `npm run dev` to run Next.js
