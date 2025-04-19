# Compliance Review UI

A Next.js application for reviewing and editing compliance copy, with auto-generated correction suggestions.

## Live Demo

[https://ctram.github.io/compliance-ui/](https://ctram.github.io/compliance-ui/)

## Features

- Reviews text content for compliance violations.
- Displays original text with highlighted violations.
- Provides correction suggestions for each violation.
- Allows both automated and manual text corrections.

## Design Thoughts

UX was designed with a focus on simplicity, as the feature is meant to be used hundreds of times a day by the user.

There are two main scopes:
1. The original copy in its entirely. This provides the user with a view of the context, the "forest".
2. Individual compliance violations. This provides the user with a view of the "trees".

Other considerations:
- The UI contains a lot of negative space, to help draw user eyes to relevant text and clickable components.
- Use of shadows is minimal to reduce cognitive load. Instead, simple borders are used to outline discrete UI components.
- Buttons use familiar shapes and hover cursor icons.
- Within the original copy, compliance violations are marked using strong underlines along with cursor pointer icon upon hovering.
- There are two ways to navigate between compliance violations:
  - Clicking directly on the compliance violation in the left panel.
  - Using the pagination/navigator at the top of the right panel.
- This allows user to focus on a single panel at a time, as needed.
- After a suggested correction is selected, the original violation can be shown or hidden within the left panel, allowing the user to view only the final, modified copy (reducing cognitive load) or to view changes in context of the original copy, to check whether any messaging has been lost, etc.


## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- TypeScript

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/utils` - Helper functions and utilities

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

> 💡 **Tip**  
> You might need to use https, that is, navigate to https://localhost:3000,
> depending on your browser settings.
>
> The local app does not support https, so you might receive a warning from your browser.
> Tell the browser you don't care and to go to the address, anyway.

## App Usage

### Initial Load

The app loads a single copy to review, along with any violations found within the copy and their suggested corrections.

### Layout

The interface is split into two main panels:

- **Left Panel**: Displays the entire copy with user-chosen suggested corrections for violation remediation.
- **Right Panel**: Shows one violation at a time with its suggested corrections.

### Navigating Violations

You can move between violations in two ways:

- Use the "Prev" and "Next" buttons at the top of the right panel
- Click directly on any violation in the left panel to focus on it in the right panel

### Handling Violations

In the right panel, you can either:

- Accept the original text
- Choose one of the suggested corrections

### Manual Editing

To edit the entire copy manually:

- Double click on any non-violation text (violations are underlined)
- A text editor will appear for free-form modifications
- **Note**: Saving a manual edit will remove access to violations and their suggested corrections

### Copy Management

Several options are available to manage the copy:

- **Reset**: Revert any changes made to the copy
- **Approve**: Accept the copy in its current state (whether edited or original)
- **Cancel Approval**: Unapprove the copy and revert all changes

## Development

The project uses Next.js with the App Router and TypeScript. Components are built with React and styled using Tailwind CSS.

## Future Improvments For Consideration

- After user manually edits copy, process the edited copy again for new violations and suggested corrections.
- Support reviewing multiple copy instances.
- Violation category filtering.
- Ability to perform Batch approvals, with and without option for app to automatically choose corrections.
- Review history and audit trail.
