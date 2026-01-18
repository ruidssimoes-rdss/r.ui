import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@r-ui/react-native';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    showTooltip: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultSlider() {
  const [value, setValue] = useState(50);

  return (
    <View style={styles.container}>
      <Slider value={value} onValueChange={setValue} />
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultSlider />,
};

// ============================================================================
// Story: WithValue
// ============================================================================
function WithValueSlider() {
  const [value, setValue] = useState(35);

  return (
    <View style={styles.container}>
      <View style={styles.valueDisplay}>
        <Text style={styles.valueLabel}>Value:</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
      <Slider value={value} onValueChange={setValue} />
    </View>
  );
}

export const WithValue: Story = {
  render: () => <WithValueSlider />,
};

// ============================================================================
// Story: Range
// ============================================================================
function RangeSlider() {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.rangeHeader}>
        <Text style={styles.rangeLabel}>0</Text>
        <Text style={styles.rangeValue}>{value}</Text>
        <Text style={styles.rangeLabel}>100</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
      />
      <Text style={styles.hint}>Drag the slider between 0 and 100</Text>
    </View>
  );
}

export const Range: Story = {
  render: () => <RangeSlider />,
};

// ============================================================================
// Story: Steps
// ============================================================================
function StepsSlider() {
  const [value, setValue] = useState(50);

  return (
    <View style={styles.container}>
      <View style={styles.stepsHeader}>
        <Text style={styles.stepsLabel}>Step size: 10</Text>
        <Text style={styles.stepsValue}>{value}</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={10}
      />
      <View style={styles.stepsMarkers}>
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark) => (
          <Text key={mark} style={styles.stepMarker}>
            |
          </Text>
        ))}
      </View>
    </View>
  );
}

export const Steps: Story = {
  render: () => <StepsSlider />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.disabledLabel}>Disabled at 70%</Text>
      <Slider value={70} disabled />
      <Text style={styles.hint}>This slider cannot be interacted with</Text>
    </View>
  ),
};

// ============================================================================
// Story: PriceRange
// ============================================================================
function PriceRangeSlider() {
  const [value, setValue] = useState(250);

  return (
    <View style={styles.priceContainer}>
      <Text style={styles.filterTitle}>Price Range</Text>
      <View style={styles.priceDisplay}>
        <Text style={styles.priceValue}>${value}</Text>
        <Text style={styles.priceMax}>/ $1,000</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={1000}
        step={50}
      />
      <View style={styles.priceLabels}>
        <Text style={styles.priceLabel}>$0</Text>
        <Text style={styles.priceLabel}>$1,000</Text>
      </View>
      <View style={styles.priceResults}>
        <Text style={styles.priceResultsText}>
          Showing products under ${value}
        </Text>
      </View>
    </View>
  );
}

export const PriceRange: Story = {
  render: () => <PriceRangeSlider />,
};

// ============================================================================
// Story: Volume
// ============================================================================
function VolumeSlider() {
  const [value, setValue] = useState(50);

  const getVolumeIcon = () => {
    if (value === 0) return '🔇';
    if (value < 30) return '🔈';
    if (value < 70) return '🔉';
    return '🔊';
  };

  return (
    <View style={styles.volumeContainer}>
      <View style={styles.volumeHeader}>
        <Text style={styles.volumeIcon}>{getVolumeIcon()}</Text>
        <Text style={styles.volumeTitle}>Volume</Text>
        <Text style={styles.volumePercent}>{value}%</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
      />
      <View style={styles.volumeQuickButtons}>
        <Text
          style={styles.volumeQuickButton}
          onPress={() => setValue(0)}
        >
          Mute
        </Text>
        <Text
          style={styles.volumeQuickButton}
          onPress={() => setValue(50)}
        >
          50%
        </Text>
        <Text
          style={styles.volumeQuickButton}
          onPress={() => setValue(100)}
        >
          Max
        </Text>
      </View>
    </View>
  );
}

export const Volume: Story = {
  render: () => <VolumeSlider />,
};

// ============================================================================
// Story: Rating
// ============================================================================
function RatingSlider() {
  const [value, setValue] = useState(7);

  const getRatingLabel = () => {
    if (value <= 2) return 'Poor';
    if (value <= 4) return 'Fair';
    if (value <= 6) return 'Good';
    if (value <= 8) return 'Very Good';
    return 'Excellent';
  };

  const getRatingColor = () => {
    if (value <= 2) return '#ef5350';
    if (value <= 4) return '#ff9800';
    if (value <= 6) return '#ffc107';
    if (value <= 8) return '#8bc34a';
    return '#4caf50';
  };

  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingTitle}>Rate your experience</Text>
      <View style={styles.ratingValueContainer}>
        <Text style={[styles.ratingValue, { color: getRatingColor() }]}>
          {value}
        </Text>
        <Text style={styles.ratingMax}>/10</Text>
      </View>
      <Text style={[styles.ratingLabel, { color: getRatingColor() }]}>
        {getRatingLabel()}
      </Text>
      <Slider
        value={value}
        onValueChange={setValue}
        min={1}
        max={10}
        step={1}
      />
      <View style={styles.ratingScale}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <Text
            key={num}
            style={[
              styles.ratingScaleNumber,
              num === value && styles.ratingScaleNumberActive,
            ]}
          >
            {num}
          </Text>
        ))}
      </View>
    </View>
  );
}

export const Rating: Story = {
  render: () => <RatingSlider />,
};

// ============================================================================
// Story: Brightness
// ============================================================================
function BrightnessSlider() {
  const [brightness, setBrightness] = useState(75);
  const [contrast, setContrast] = useState(50);

  return (
    <View style={styles.brightnessContainer}>
      <Text style={styles.brightnessTitle}>Display Settings</Text>

      <View style={styles.brightnessControl}>
        <View style={styles.brightnessHeader}>
          <Text style={styles.brightnessIcon}>☀️</Text>
          <Text style={styles.brightnessLabel}>Brightness</Text>
          <Text style={styles.brightnessValue}>{brightness}%</Text>
        </View>
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          min={0}
          max={100}
        />
      </View>

      <View style={styles.brightnessControl}>
        <View style={styles.brightnessHeader}>
          <Text style={styles.brightnessIcon}>◐</Text>
          <Text style={styles.brightnessLabel}>Contrast</Text>
          <Text style={styles.brightnessValue}>{contrast}%</Text>
        </View>
        <Slider
          value={contrast}
          onValueChange={setContrast}
          min={0}
          max={100}
        />
      </View>

      <View
        style={[
          styles.brightnessPreview,
          {
            opacity: brightness / 100,
            backgroundColor: `rgb(${128 + (contrast - 50)}, ${128 + (contrast - 50)}, ${128 + (contrast - 50)})`,
          },
        ]}
      >
        <Text style={styles.brightnessPreviewText}>Preview</Text>
      </View>
    </View>
  );
}

export const Brightness: Story = {
  render: () => <BrightnessSlider />,
};

// ============================================================================
// Story: CustomTrack
// ============================================================================
function CustomTrackSlider() {
  const [temperature, setTemperature] = useState(22);

  const getTemperatureColor = () => {
    if (temperature < 16) return '#2196f3';
    if (temperature < 20) return '#4caf50';
    if (temperature < 24) return '#ff9800';
    return '#ef5350';
  };

  const getTemperatureLabel = () => {
    if (temperature < 16) return 'Cold';
    if (temperature < 20) return 'Cool';
    if (temperature < 24) return 'Comfortable';
    return 'Warm';
  };

  return (
    <View style={styles.temperatureContainer}>
      <View style={styles.temperatureHeader}>
        <Text style={styles.temperatureIcon}>🌡️</Text>
        <Text style={styles.temperatureTitle}>Thermostat</Text>
      </View>

      <View style={styles.temperatureDisplay}>
        <Text style={[styles.temperatureValue, { color: getTemperatureColor() }]}>
          {temperature}°C
        </Text>
        <Text style={styles.temperatureLabel}>{getTemperatureLabel()}</Text>
      </View>

      <View style={styles.temperatureGradient}>
        <View style={[styles.temperatureGradientCold]} />
        <View style={[styles.temperatureGradientCool]} />
        <View style={[styles.temperatureGradientWarm]} />
        <View style={[styles.temperatureGradientHot]} />
      </View>

      <Slider
        value={temperature}
        onValueChange={setTemperature}
        min={10}
        max={30}
        step={1}
      />

      <View style={styles.temperatureScale}>
        <Text style={styles.temperatureScaleText}>10°C</Text>
        <Text style={styles.temperatureScaleText}>30°C</Text>
      </View>

      <View style={styles.temperaturePresets}>
        <Text style={styles.temperaturePresetsTitle}>Presets:</Text>
        <View style={styles.temperaturePresetButtons}>
          <Text
            style={[styles.temperaturePresetButton, { backgroundColor: '#2196f3' }]}
            onPress={() => setTemperature(16)}
          >
            Eco 16°
          </Text>
          <Text
            style={[styles.temperaturePresetButton, { backgroundColor: '#4caf50' }]}
            onPress={() => setTemperature(20)}
          >
            Normal 20°
          </Text>
          <Text
            style={[styles.temperaturePresetButton, { backgroundColor: '#ff9800' }]}
            onPress={() => setTemperature(24)}
          >
            Cozy 24°
          </Text>
        </View>
      </View>
    </View>
  );
}

export const CustomTrack: Story = {
  render: () => <CustomTrackSlider />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 24,
    gap: 16,
  },
  valueDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 8,
  },
  valueLabel: {
    fontSize: 14,
    color: '#666',
  },
  valueText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  rangeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rangeLabel: {
    fontSize: 14,
    color: '#666',
  },
  rangeValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepsLabel: {
    fontSize: 14,
    color: '#666',
  },
  stepsValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  stepsMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  stepMarker: {
    fontSize: 10,
    color: '#ccc',
  },
  disabledLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  priceDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  priceValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#007AFF',
  },
  priceMax: {
    fontSize: 16,
    color: '#999',
    marginLeft: 4,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceResults: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  priceResultsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  volumeContainer: {
    width: 320,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
  },
  volumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  volumeIcon: {
    fontSize: 28,
  },
  volumeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  volumePercent: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  volumeQuickButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  volumeQuickButton: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  ratingValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingValue: {
    fontSize: 64,
    fontWeight: '700',
  },
  ratingMax: {
    fontSize: 24,
    color: '#999',
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  ratingScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  ratingScaleNumber: {
    fontSize: 12,
    color: '#999',
    width: 24,
    textAlign: 'center',
  },
  ratingScaleNumberActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
  brightnessContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 20,
  },
  brightnessTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  brightnessControl: {
    gap: 8,
  },
  brightnessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brightnessIcon: {
    fontSize: 18,
  },
  brightnessLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  brightnessValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  brightnessPreview: {
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brightnessPreviewText: {
    color: '#fff',
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  temperatureContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  temperatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  temperatureIcon: {
    fontSize: 28,
  },
  temperatureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  temperatureDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureValue: {
    fontSize: 56,
    fontWeight: '700',
  },
  temperatureLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  temperatureGradient: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  temperatureGradientCold: {
    flex: 1,
    backgroundColor: '#2196f3',
  },
  temperatureGradientCool: {
    flex: 1,
    backgroundColor: '#4caf50',
  },
  temperatureGradientWarm: {
    flex: 1,
    backgroundColor: '#ff9800',
  },
  temperatureGradientHot: {
    flex: 1,
    backgroundColor: '#ef5350',
  },
  temperatureScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temperatureScaleText: {
    fontSize: 12,
    color: '#666',
  },
  temperaturePresets: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  temperaturePresetsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  temperaturePresetButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  temperaturePresetButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    overflow: 'hidden',
  },
});
