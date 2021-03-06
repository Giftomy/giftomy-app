import { gql } from '@apollo/client';

export const GET_USER_BY_ADDRESS = gql`
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			id
			firstName
			lastName
			name
			email
			avatar
			walletAddress
			url
			location
			totalReceived
			likedProjectsCount
			projectsCount
		}
	}
`;

export const FETCH_USER_PROJECTS = gql`
	query FetchUserProjects(
		$take: Float
		$skip: Float
		$userId: Int!
		$orderBy: OrderField!
		$direction: OrderDirection!
	) {
		projectsByUserId(
			take: $take
			skip: $skip
			userId: $userId
			orderBy: { field: $orderBy, direction: $direction }
		) {
			projects {
				id
				title
				balance
				description
				image
				slug
				creationDate
				admin
				walletAddress
				impactLocation
				listed
				totalReactions
				verified
				status {
					id
					name
				}
				categories {
					name
				}
				qualityScore
			}
			totalCount
		}
	}
`;

export const UPLOAD_PROFILE_PHOTO = gql`
	mutation ($fileUpload: FileUploadInputType!) {
		upload(fileUpload: $fileUpload)
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser(
		$url: String
		$location: String
		$email: String
		$lastName: String
		$firstName: String
		$avatar: String
	) {
		updateUser(
			url: $url
			location: $location
			email: $email
			firstName: $firstName
			lastName: $lastName
			avatar: $avatar
		)
	}
`;
