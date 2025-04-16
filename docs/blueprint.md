# **App Name**: BudgetHome

## Core Features:

- Input Form: Input form for total built-up area (sq.ft) and cost per sq.ft (INR) with validation.
- Cost Calculation: Calculates the estimated construction cost and breaks it down into components (Foundation, Structure, Roofing, Finishing, Interiors) using predefined percentages.
- Detailed Breakdown: Displays the cost breakdown for each component in a detailed table format.
- Graphical Representation: Generates a pie chart visualizing the cost distribution among the main components using HTML Canvas API.
- Share & Reset: Implements sharing functionality using the Web Share API and a reset button to clear inputs.

## Style Guidelines:

- Primary color: Light green (#E8F5E9) to represent growth and stability.
- Secondary color: Neutral gray (#FAFAFA) for backgrounds and subtle contrasts.
- Accent: Teal (#008080) for interactive elements and primary calls to action.
- Mobile-first, responsive design using CSS grid and flexbox for flexible layouts.
- Use simple, line-based icons to represent different construction components.
- Subtle transitions and animations to provide feedback on user interactions.

## Original User Request:
Project Overview:
Develop a mobile application that helps users estimate their house construction budget. The app should accept user input for total built-up area (in square feet) and cost per square foot (in INR). It will then calculate the overall construction cost and display a detailed breakdown of that cost across various construction components such as Foundation, Structure, Roofing, Finishing, and Interiors. Additionally, each major component should have a further sub-breakdown of its cost allocation.

Key Features and Functionalities:

User Input and Calculation:

Create an input form where users enter:

Total built-up area (in sq.ft)

Cost per sq.ft (in INR)

Validate the user input to ensure positive numerical values.

Calculate the total estimated construction cost by multiplying the area by the cost per square foot.

Main Cost Breakdown:

Use fixed percentage allocations for the main components:

Foundation: 15%

Structure: 35%

Roofing: 10%

Finishing: 25%

Interiors: 15%

Display the cost for each component in a table format, with columns for component name, percentage allocation, and cost (formatted in Indian currency).

Detailed Sub-Breakdown:

For each main component, display a further breakdown into sub-components (e.g., Foundation: Excavation, Concrete, Reinforcement) using predefined percentages.

Present these details in separate tables under each component's section.

Graphical Representation:

Generate a pie chart using the HTML Canvas API to visually represent the cost distribution among the main components.

Include percentage labels on each segment of the chart to indicate the allocation visually.

Responsive and Mobile-First Design:

Utilize a mobile-friendly, responsive layout with CSS media queries. Ensure that the design scales gracefully on smaller screens.

Maintain a clean and intuitive user interface using modern typography, spacing, and color schemes.

Sharing and Reset Functionality:

Implement a share button that uses the Web Share API, allowing users to share their calculation results (if their browser or device supports it).

Provide a reset button to clear previous inputs and outputs so that users can perform new calculations.

Additional Considerations:

Ensure smooth interactions with clear error messages (e.g., alert for invalid inputs).

Provide an aesthetically pleasing design using box shadows, border radius, and color transitions for buttons.

Include a navigational back button to return to the main/home screen.

Optimize performance so that the cost calculation, detailed breakdown generation, and pie chart rendering are seamless on mobile devices.
  