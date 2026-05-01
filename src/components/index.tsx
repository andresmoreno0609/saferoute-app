// Componentes UI Base - SafeRoute
// Basados en COMPONENTES_BASE.md + Web Guidelines

import {
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
  TextInputProps,
} from 'react-native';
import { useState } from 'react';

// ============================================
// 1. Button
// ============================================

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  
  const buttonStyles = StyleSheet.flatten([
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    (disabled || loading) && styles.buttonDisabled,
    pressed && styles.buttonPressed,
    style,
  ]);

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={buttonStyles}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2563eb'} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            styles[`buttonText_${variant}`],
            styles[`buttonText_${size}`],
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

// ============================================
// 2. Input
// ============================================

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
}

export function Input({ label, error, helper, style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  
  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.inputLabel}>{label}</Text>
      )}
      <TextInput
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        style={[
          styles.input,
          focused && styles.inputFocused,
          error && styles.inputError,
          props.editable === false && styles.inputDisabled,
          style,
        ]}
        placeholderTextColor="#9ca3af"
      />
      {helper && !error && (
        <Text style={styles.inputHelper}>{helper}</Text>
      )}
      {error && (
        <Text style={styles.inputErrorText}>{error}</Text>
      )}
    </View>
  );
}

// ============================================
// 3. Card
// ============================================

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

// ============================================
// 4. Header
// ============================================

interface HeaderProps {
  title: string;
  leftAction?: {
    icon: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  rightAction?: {
    icon: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
}

export function Header({ title, leftAction, rightAction }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {leftAction && (
          <Pressable
            onPress={leftAction.onPress}
            style={styles.headerButton}
            accessibilityRole="button"
            accessibilityLabel={leftAction.accessibilityLabel}
          >
            <Text style={styles.headerIcon}>{leftAction.icon}</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>
        {rightAction && (
          <Pressable
            onPress={rightAction.onPress}
            style={styles.headerButton}
            accessibilityRole="button"
            accessibilityLabel={rightAction.accessibilityLabel}
          >
            <Text style={styles.headerIcon}>{rightAction.icon}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ============================================
// 5. BottomNav (App)
// ============================================

interface BottomNavItem {
  icon: string;
  label: string;
  active?: boolean;
}

interface BottomNavProps {
  items: BottomNavItem[];
  onPress: (index: number) => void;
}

export function BottomNav({ items, onPress }: BottomNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.bottomNav}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            setActiveIndex(index);
            onPress(index);
          }}
          style={styles.bottomNavItem}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{ selected: index === activeIndex }}
        >
          <Text style={styles.bottomNavIcon}>{item.icon}</Text>
          <Text
            style={[
              styles.bottomNavLabel,
              index === activeIndex && styles.bottomNavLabelActive,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// ============================================
// 6. Sidebar (Web Admin)
// ============================================

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeHref: string;
  onNavigate: (href: string) => void;
  user?: {
    name: string;
    role: string;
  };
}

export function Sidebar({ items, activeHref, onNavigate, user }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarLogo}>
        <Text style={styles.sidebarLogoText}>SafeRoute</Text>
      </View>
      <View style={styles.sidebarNav}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => onNavigate(item.href)}
            style={[
              styles.sidebarItem,
              item.href === activeHref && styles.sidebarItemActive,
            ]}
            accessibilityRole="link"
            accessibilityLabel={item.label}
          >
            <Text style={styles.sidebarIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.sidebarLabel,
                item.href === activeHref && styles.sidebarLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {user && (
        <View style={styles.sidebarUser}>
          <Text style={styles.sidebarUserName}>{user.name}</Text>
          <Text style={styles.sidebarUserRole}>{user.role}</Text>
        </View>
      )}
    </View>
  );
}

// ============================================
// 7. Avatar
// ============================================

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={[styles.avatar, styles[`avatar_${size}`]]}>
      <Text style={[styles.avatarText, styles[`avatarText_${size}`]]}>
        {initials}
      </Text>
    </View>
  );
}

// ============================================
// 8. Badge
// ============================================

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

export function Badge({ text, variant = 'primary' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`]]}>
      <Text style={[styles.badgeText, styles[`badgeText_${variant}`]]}>
        {text}
      </Text>
    </View>
  );
}

// ============================================
// 9. Empty State
// ============================================

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    title: string;
    onPress: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      {icon && <Text style={styles.emptyStateIcon}>{icon}</Text>}
      <Text style={styles.emptyStateTitle}>{title}</Text>
      {description && (
        <Text style={styles.emptyStateDescription}>{description}</Text>
      )}
      {action && (
        <Pressable
          onPress={action.onPress}
          style={styles.emptyStateButton}
          accessibilityRole="button"
          accessibilityLabel={action.title}
        >
          <Text style={styles.emptyStateButtonText}>{action.title}</Text>
        </Pressable>
      )}
    </View>
  );
}

// ============================================
// 10. Loading Spinner
// ============================================

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size} color="#2563eb" />
    </View>
  );
}

// ============================================
// 11. List Item
// ============================================

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightElement,
  onPress,
}: ListItemProps) {
  const content = (
    <>
      {leftIcon && <Text style={styles.listItemIcon}>{leftIcon}</Text>}
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.listItemSubtitle}>{subtitle}</Text>
        )}
      </View>
      {rightElement && <View style={styles.listItemRight}>{rightElement}</View>}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={styles.listItem}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.listItem}>{content}</View>;
}

// ============================================
// 12. Divider
// ============================================

export function Divider() {
  return <View style={styles.divider} />;
}

// ============================================
// Styles - Basados en COMPONENTES_BASE.md
// ============================================

const styles = StyleSheet.create({
  // Button
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  } as ViewStyle,
button_primary: {
    backgroundColor: '#006a61',  // Primary: Teal
  } as ViewStyle,
  button_secondary: {
    backgroundColor: '#f3f4f6',
  } as ViewStyle,
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2563eb',
  } as ViewStyle,
  button_ghost: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  button_sm: {
    height: 40,
    minWidth: 88,
    paddingHorizontal: 12,
  } as ViewStyle,
  button_md: {
    height: 44,
    minWidth: 96,
    paddingHorizontal: 16,
  } as ViewStyle,
  button_lg: {
    height: 48,
    minWidth: 104,
    paddingHorizontal: 20,
  } as ViewStyle,
  buttonDisabled: {
    opacity: 0.5,
  } as ViewStyle,
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  } as ViewStyle,
  buttonText: {
    fontWeight: '600',
  } as TextStyle,
  buttonText_primary: {
    color: '#fff',
  } as TextStyle,
  buttonText_secondary: {
    color: '#111827',
  } as TextStyle,
  buttonText_outline: {
    color: '#2563eb',
  } as TextStyle,
  buttonText_ghost: {
    color: '#2563eb',
  } as TextStyle,
  buttonText_sm: {
    fontSize: 14,
  } as TextStyle,
  buttonText_md: {
    fontSize: 16,
  } as TextStyle,
  buttonText_lg: {
    fontSize: 18,
  } as TextStyle,

  // Input
  inputContainer: {
    gap: 4,
  } as ViewStyle,
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  } as TextStyle,
  input: {
    height: 44,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
  } as TextStyle,
  inputFocused: {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
  } as ViewStyle,
  inputError: {
    borderColor: '#ef4444',
  } as TextStyle,
  inputDisabled: {
    backgroundColor: '#f3f4f6',
    opacity: 0.7,
  } as TextStyle,
  inputHelper: {
    fontSize: 12,
    color: '#9ca3af',
  } as TextStyle,
  inputErrorText: {
    fontSize: 12,
    color: '#ef4444',
  } as TextStyle,

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  } as ViewStyle,

  // Header
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  } as ViewStyle,
  headerLeft: {
    width: 48,
    alignItems: 'flex-start',
  } as ViewStyle,
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  } as TextStyle,
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
  } as ViewStyle,
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  headerIcon: {
    fontSize: 24,
  } as TextStyle,

  // BottomNav
  bottomNav: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
  } as ViewStyle,
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  } as ViewStyle,
  bottomNavIcon: {
    fontSize: 24,
  } as TextStyle,
  bottomNavLabel: {
    fontSize: 12,
    color: '#6b7280',
  } as TextStyle,
  bottomNavLabelActive: {
    color: '#2563eb',
    fontWeight: '600',
  } as TextStyle,

  // Sidebar
  sidebar: {
    width: 240,
    backgroundColor: '#111827',
    height: '100%',
  } as ViewStyle,
  sidebarLogo: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  } as ViewStyle,
  sidebarLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  } as TextStyle,
  sidebarNav: {
    flex: 1,
    paddingVertical: 16,
  } as ViewStyle,
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  } as ViewStyle,
  sidebarItemActive: {
    backgroundColor: '#1f2937',
  } as ViewStyle,
  sidebarIcon: {
    fontSize: 20,
  } as TextStyle,
  sidebarLabel: {
    fontSize: 14,
    color: '#d1d5db',
  } as TextStyle,
  sidebarLabelActive: {
    color: '#fff',
    fontWeight: '600',
  } as TextStyle,
  sidebarUser: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  } as ViewStyle,
  sidebarUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  } as TextStyle,
  sidebarUserRole: {
    fontSize: 12,
    color: '#9ca3af',
  } as TextStyle,

  // Avatar
  avatar: {
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  } as ViewStyle,
  avatar_sm: {
    width: 32,
    height: 32,
  } as ViewStyle,
  avatar_md: {
    width: 40,
    height: 40,
  } as ViewStyle,
  avatar_lg: {
    width: 56,
    height: 56,
  } as ViewStyle,
  avatarText: {
    fontWeight: '600',
    color: '#4b5563',
  } as TextStyle,
  avatarText_sm: {
    fontSize: 12,
  } as TextStyle,
  avatarText_md: {
    fontSize: 14,
  } as TextStyle,
  avatarText_lg: {
    fontSize: 18,
  } as TextStyle,

  // Badge
  badge: {
    paddingHorizontal: 8,
    borderRadius: 9999,
  } as ViewStyle,
  badge_primary: {
    backgroundColor: '#dbeafe',
  } as ViewStyle,
  badge_success: {
    backgroundColor: '#dcfce7',
  } as ViewStyle,
  badge_warning: {
    backgroundColor: '#fef3c7',
  } as ViewStyle,
  badge_error: {
    backgroundColor: '#fee2e2',
  } as ViewStyle,
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,
  badgeText_primary: {
    color: '#1d4ed8',
  } as TextStyle,
  badgeText_success: {
    color: '#15803d',
  } as TextStyle,
  badgeText_warning: {
    color: '#b45309',
  } as TextStyle,
  badgeText_error: {
    color: '#b91c1c',
  } as TextStyle,

  // EmptyState
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  } as ViewStyle,
  emptyStateIcon: {
    fontSize: 64,
  } as TextStyle,
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  } as TextStyle,
  emptyStateDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  } as TextStyle,
  emptyStateButton: {
    marginTop: 8,
  } as ViewStyle,
  emptyStateButtonText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  } as TextStyle,

  // Spinner
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  } as ViewStyle,

  // ListItem
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    minHeight: 56,
  } as ViewStyle,
  listItemIcon: {
    fontSize: 24,
  } as TextStyle,
  listItemContent: {
    flex: 1,
  } as ViewStyle,
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  } as TextStyle,
  listItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  } as TextStyle,
  listItemRight: {
    alignItems: 'flex-end',
  } as ViewStyle,

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  } as ViewStyle,
});
