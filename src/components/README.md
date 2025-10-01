# LogoWall Component

A reusable, configurable logo showcase component inspired by modern logo walls with gradient backgrounds and interactive hover effects.

## Features

- **Configurable Layout**: Responsive grid system (2 columns on mobile, customizable on desktop)
- **Multiple Sections**: Support for awards, clients, partners, or any categorized logo showcase
- **Custom Gradients**: Beautiful gradient backgrounds with purple/blue default theme
- **Interactive Effects**: Hover animations and scaling effects
- **TypeScript Support**: Fully typed with comprehensive interfaces
- **Accessibility**: Proper link handling and keyboard navigation
- **Responsive Design**: Adapts seamlessly across all device sizes

## Basic Usage

```tsx
import LOGOsShowcase from './components/LOGOsShowcase';

// Simple usage with default configuration
<LOGOsShowcase />

// Custom title and gradient
<LOGOsShowcase
  title="Our Partners"
  subtitle="Trusted by industry leaders"
  gradient="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"
  gridCols={4}
/>
```

## Advanced Configuration

### Multi-Section Layout

```tsx
import { LogoWallSection } from './components/types/LogoWall.types';

const sections: LogoWallSection[] = [
  {
    title: "Our Clients",
    logos: [
      { id: 'apple', name: 'Apple', icon: '🍎', url: 'https://apple.com' },
      { id: 'google', name: 'Google', icon: '🔍', url: 'https://google.com' }
    ]
  },
  {
    title: "Partners",
    logos: [
      { id: 'netflix', name: 'Netflix', icon: '🎬' },
      { id: 'spotify', name: 'Spotify', icon: '🎵' }
    ]
  }
];

<LOGOsShowcase
  title="Company Showcase"
  sections={sections}
  gradient="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
/>
```

### Standalone LogoWall

```tsx
import { LogoWall } from './components/LOGOsShowcase';

const techLogos = [
  { id: 'react', name: 'React', icon: '⚛️' },
  { id: 'nextjs', name: 'Next.js', icon: '▲' }
];

<div className="bg-gray-900 p-8">
  <LogoWall 
    logos={techLogos} 
    gridCols={2}
    className="max-w-md mx-auto"
  />
</div>
```

## Props Reference

### LOGOsShowcase Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"MARQUEE LOGO WALL"` | Main section title |
| `subtitle` | `string` | Chinese default text | Subtitle/description text |
| `sections` | `LogoWallSection[]` | Default tech companies | Array of logo sections |
| `gradient` | `string` | Purple-blue gradient | CSS gradient background |
| `gridCols` | `number` | `4` | Number of columns on desktop |
| `showTitle` | `boolean` | `true` | Whether to show the main title |
| `containerClassName` | `string` | `""` | Additional CSS classes |

### Logo Interface

```tsx
interface Logo {
  id: string;           // Unique identifier
  name: string;         // Display name
  icon?: ReactNode;     // Icon/emoji/component to display
  url?: string;         // Optional link URL
}
```

### LogoWallSection Interface

```tsx
interface LogoWallSection {
  title: string;        // Section title
  logos: Logo[];        // Array of logos for this section
  accentColor?: string; // Optional accent color (future use)
}
```

## Customization Examples

### Custom Gradients

```tsx
// Green tech theme
<LOGOsShowcase gradient="bg-gradient-to-br from-green-400 via-teal-500 to-blue-600" />

// Sunset theme
<LOGOsShowcase gradient="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

// Corporate blue
<LOGOsShowcase gradient="bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500" />
```

### Grid Layouts

```tsx
// 2 columns for mobile-focused design
<LOGOsShowcase gridCols={2} />

// 6 columns for dense logo display
<LOGOsShowcase gridCols={6} />

// 3 columns for balanced layout
<LOGOsShowcase gridCols={3} />
```

## Best Practices

1. **Logo Format**: Use emojis for quick prototyping, SVG icons for production
2. **Grid Columns**: 4 columns work well for most desktop layouts
3. **Logo Count**: Aim for 4-8 logos per section for visual balance
4. **Accessibility**: Always provide meaningful `name` properties for screen readers
5. **Performance**: Consider lazy loading for large logo collections

## Styling Notes

- Uses Tailwind CSS for styling
- Semi-transparent white backgrounds (`bg-white/20`) for logo containers
- Backdrop blur effects for modern glass-morphism look
- Smooth transitions and hover effects
- Responsive typography and spacing