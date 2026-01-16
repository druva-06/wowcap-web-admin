/**
 * Authentication API client
 * Handles signup and authentication operations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Student signup request DTO
 */
export interface StudentSignupRequestDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

/**
 * Invited user signup request DTO
 */
export interface InvitedSignupRequestDto {
    invitationToken: string;
    email: string;
    password: string;
}

/**
 * Signup response DTO
 */
export interface SignupResponseDto {
    userId: number;
    cognitoUserId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roleName: string;
    message: string;
    requiresEmailVerification: boolean;
}

/**
 * Sign up as a student (no invitation required)
 */
export async function signupStudent(data: StudentSignupRequestDto): Promise<SignupResponseDto> {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            full_name: data.fullName,
            email: data.email,
            phone_number: data.phoneNumber,
            password: data.password,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Student signup failed');
    }

    const result = await response.json();
    
    return {
        userId: result.user_id,
        cognitoUserId: result.cognito_user_id,
        username: result.username,
        email: result.email,
        firstName: result.first_name,
        lastName: result.last_name,
        roleName: result.role_name,
        message: result.message,
        requiresEmailVerification: result.requires_email_verification,
    };
}

/**
 * Sign up with invitation token (for COLLEGE, COUNSELOR, SUBAGENT roles)
 */
export async function signupWithInvitation(data: InvitedSignupRequestDto): Promise<SignupResponseDto> {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup/invited`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            invitation_token: data.invitationToken,
            email: data.email,
            password: data.password,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
    }

    const result = await response.json();
    
    return {
        userId: result.user_id,
        cognitoUserId: result.cognito_user_id,
        username: result.username,
        email: result.email,
        firstName: result.first_name,
        lastName: result.last_name,
        roleName: result.role_name,
        message: result.message,
        requiresEmailVerification: result.requires_email_verification,
    };
}
