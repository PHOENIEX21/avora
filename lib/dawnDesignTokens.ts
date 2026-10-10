/**
 * AVORA Dawn design tokens.
 * Transcribed from the approved design-reference ZIP and restructuring spec.
 * Reference markup is NOT production UI and contains sample learner content.
 * Scope these variables to the new weekly shell until the owner approves the rollout.
 */
export const dawnTokens = {
 colors: {
  night:'#0E0F2E',deepViolet:'#2A1B6B',violet:'#6C4CF1',
  rose:'#F0568C',teal:'#19C3B1',gold:'#FFC857',
  cream:'#FBF7F2',white:'#FFFFFF',ink:'#1B1840',
  muted:'#5B5886',border:'#EAE5F5',softViolet:'#EEEAF8',
  successMint:'#DDF5EC',warningGold:'#FFF0C9',errorCoral:'#E86A65',
  english:'#3B82F6',mathematics:'#E8590C',basicScience:'#12A594'
 },
 typography:{display:'Fraunces, Georgia, serif',body:'Plus Jakarta Sans, system-ui, sans-serif',bodyMinPx:16},
 mobile:{referenceWidthPx:390,smallWidthPx:360,largeWidthPx:412,sidePaddingPx:24,minTapTargetPx:44},
 motion:{durationMinMs:200,durationMaxMs:350},
 gradients:{aurora:'linear-gradient(120deg, #6C4CF1 0%, #F0568C 52%, #19C3B1 100%)'}
} as const;

export const dawnCssVariables = {
 '--avora-dawn-night':dawnTokens.colors.night,
 '--avora-dawn-ink':dawnTokens.colors.ink,
 '--avora-dawn-cream':dawnTokens.colors.cream,
 '--avora-dawn-violet':dawnTokens.colors.violet,
 '--avora-dawn-rose':dawnTokens.colors.rose,
 '--avora-dawn-teal':dawnTokens.colors.teal,
 '--avora-dawn-gold':dawnTokens.colors.gold,
 '--avora-dawn-border':dawnTokens.colors.border,
 '--avora-dawn-aurora':dawnTokens.gradients.aurora
} as const;
