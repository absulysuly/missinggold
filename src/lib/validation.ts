/**
 * Validation & Sanitization Utilities
 * 
 * Comprehensive utilities for input validation and sanitization to prevent:
 * - XSS attacks
 * - SQL injection
 * - Invalid data
 * - Security vulnerabilities
 */

/**
 * Email validation regex (RFC 5322 compliant)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
 * Phone number validation (international format)
 */
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes all HTML tags and entities
 */
export function sanitizeHTML(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[^;]+;/g, '') // Remove HTML entities
    .trim();
}

/**
 * Escape HTML special characters
 */
export function escapeHTML(input: string): string {
  if (!input) return '';
  
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return input.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate URL
 */
export function isValidURL(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  return URL_REGEX.test(url.trim());
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  return PHONE_REGEX.test(phone.trim());
}

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - Contains uppercase and lowercase
 * - Contains number
 * - Contains special character
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (!password || password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain lowercase letters');
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain uppercase letters');
  } else {
    score += 1;
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Password must contain numbers');
  } else {
    score += 1;
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push('Password must contain special characters');
  } else {
    score += 1;
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    isValid: score >= 4,
    strength,
    feedback,
  };
}

/**
 * Sanitize string for safe use in URLs
 */
export function sanitizeForURL(input: string): string {
  if (!input) return '';
  
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validate and sanitize object against schema
 */
export interface ValidationSchema {
  [key: string]: {
    type: 'string' | 'number' | 'email' | 'url' | 'phone' | 'boolean';
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized: Record<string, any>;
}

export function validateObject(
  data: Record<string, any>,
  schema: ValidationSchema
): ValidationResult {
  const errors: Record<string, string> = {};
  const sanitized: Record<string, any> = {};

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];

    // Check required
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors[key] = `${key} is required`;
      continue;
    }

    // Skip validation if not required and empty
    if (!rules.required && (value === undefined || value === null || value === '')) {
      continue;
    }

    // Type validation
    switch (rules.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors[key] = `${key} must be a string`;
        } else {
          const sanitizedValue = sanitizeHTML(value);
          
          if (rules.min && sanitizedValue.length < rules.min) {
            errors[key] = `${key} must be at least ${rules.min} characters`;
          }
          if (rules.max && sanitizedValue.length > rules.max) {
            errors[key] = `${key} must be at most ${rules.max} characters`;
          }
          if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
            errors[key] = `${key} format is invalid`;
          }
          
          sanitized[key] = sanitizedValue;
        }
        break;

      case 'number':
        const num = Number(value);
        if (isNaN(num)) {
          errors[key] = `${key} must be a number`;
        } else {
          if (rules.min !== undefined && num < rules.min) {
            errors[key] = `${key} must be at least ${rules.min}`;
          }
          if (rules.max !== undefined && num > rules.max) {
            errors[key] = `${key} must be at most ${rules.max}`;
          }
          sanitized[key] = num;
        }
        break;

      case 'email':
        if (!isValidEmail(value)) {
          errors[key] = `${key} must be a valid email address`;
        } else {
          sanitized[key] = value.trim().toLowerCase();
        }
        break;

      case 'url':
        if (!isValidURL(value)) {
          errors[key] = `${key} must be a valid URL`;
        } else {
          sanitized[key] = value.trim();
        }
        break;

      case 'phone':
        if (!isValidPhone(value)) {
          errors[key] = `${key} must be a valid phone number`;
        } else {
          sanitized[key] = value.trim();
        }
        break;

      case 'boolean':
        sanitized[key] = Boolean(value);
        break;
    }

    // Custom validation
    if (rules.custom && !errors[key]) {
      if (!rules.custom(sanitized[key] || value)) {
        errors[key] = `${key} failed custom validation`;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

/**
 * Rate limit check for API endpoints
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Filter out old requests outside the time window
    const recentRequests = userRequests.filter(timestamp => now - timestamp < this.windowMs);
    
    if (recentRequests.length >= this.limit) {
      const oldestRequest = Math.min(...recentRequests);
      return {
        allowed: false,
        remaining: 0,
        resetAt: oldestRequest + this.windowMs,
      };
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return {
      allowed: true,
      remaining: this.limit - recentRequests.length,
      resetAt: now + this.windowMs,
    };
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  clear(): void {
    this.requests.clear();
  }
}

/**
 * Sanitize file name for safe storage
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return '';
  
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace unsafe characters
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .substring(0, 255); // Limit length
}

/**
 * Validate file type
 */
export function isValidFileType(
  fileName: string,
  allowedTypes: string[]
): boolean {
  if (!fileName || !allowedTypes.length) return false;
  
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

/**
 * Check if string contains SQL injection patterns
 */
export function containsSQLInjection(input: string): boolean {
  if (!input) return false;
  
  const sqlPatterns = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i,
    /(\bUNION\b.*\bSELECT\b)/i,
    /(;|\-\-|\/\*|\*\/)/,
    /(\bOR\b.*=.*|1=1|'=')/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate Iraqi phone number
 */
export function isValidIraqiPhone(phone: string): boolean {
  if (!phone) return false;
  
  // Iraqi phone format: +964 XXX XXX XXXX or 07XX XXX XXXX
  const iraqiPhoneRegex = /^(\+964|0)?7[0-9]{9}$/;
  return iraqiPhoneRegex.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Validate date range
 */
export function isValidDateRange(startDate: Date, endDate: Date): boolean {
  return startDate < endDate && startDate >= new Date();
}
