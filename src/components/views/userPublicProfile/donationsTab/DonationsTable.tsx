import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
	B,
	brandColors,
	IconExternalLink,
	IconLink24,
	neutralColors,
	P,
	SublineBold,
} from '@giveth/ui-design-system';

import { formatUSD, smallFormatDate, formatTxLink } from '@/lib/helpers';
import { slugToProjectView } from '@/lib/routeCreators';
import ExternalLink from '@/components/ExternalLink';
import { IWalletDonation } from '@/apollo/types/types';
import {
	EOrderBy,
	IOrder,
} from '@/components/views/userPublicProfile/UserPublicProfile.view';
import SortIcon from '@/components/SortIcon';

interface DonationTable {
	donations: IWalletDonation[];
	order: IOrder;
	changeOrder: (orderBy: EOrderBy) => void;
}

const DonationTable: FC<DonationTable> = ({
	donations,
	order,
	changeOrder,
}) => {
	return (
		<DonationTableContainer>
			<TableHeader onClick={() => changeOrder(EOrderBy.CreationDate)}>
				Donated at
				<SortIcon order={order} title={EOrderBy.CreationDate} />
			</TableHeader>
			<TableHeader>Project</TableHeader>
			<TableHeader>Status</TableHeader>
			<TableHeader>Currency</TableHeader>
			<TableHeader onClick={() => changeOrder(EOrderBy.TokenAmount)}>
				Amount
				<SortIcon order={order} title={EOrderBy.TokenAmount} />
			</TableHeader>
			<TableHeader onClick={() => changeOrder(EOrderBy.UsdAmount)}>
				USD Value
				<SortIcon order={order} title={EOrderBy.UsdAmount} />
			</TableHeader>
			{donations.map(donation => (
				<RowWrapper key={donation.id}>
					<TableCell>
						{smallFormatDate(new Date(donation.createdAt))}
					</TableCell>
					<Link
						href={slugToProjectView(donation.project.slug)}
						passHref
					>
						<ProjectTitleCell>
							<B>{donation.project.title}</B>
							<IconLink24 />
						</ProjectTitleCell>
					</Link>
					<TableCell>{donation.status}</TableCell>
					<TableCell>
						<CurrencyBadge>{donation.currency}</CurrencyBadge>
					</TableCell>
					<TableCell>
						<P>{donation.amount}</P>
						<ExternalLink
							href={formatTxLink(
								donation.transactionNetworkId,
								donation.transactionId,
							)}
						>
							<IconExternalLink
								size={16}
								color={brandColors.pinky[500]}
							/>
						</ExternalLink>
					</TableCell>
					<TableCell>
						{donation.valueUsd &&
							formatUSD(donation.valueUsd) + ' USD'}
					</TableCell>
				</RowWrapper>
			))}
		</DonationTableContainer>
	);
};

const RowWrapper = styled.div`
	display: contents;
	&:hover > div {
		background-color: ${neutralColors.gray[300]};
		color: ${brandColors.pinky[500]};
	}
	& > div:first-child {
		padding-left: 4px;
	}
`;

const TableCell = styled(P)<{ bold?: boolean }>`
	display: flex;
	height: 60px;
	border-bottom: 1px solid ${neutralColors.gray[300]};
	align-items: center;
	gap: 8px;
	font-weight: ${props => (props.bold ? 500 : 400)};
`;

const DonationTableContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
	overflow: auto;
	min-width: 900px;
	margin: 0 10px;
`;

const TableHeader = styled(B)`
	display: flex;
	height: 40px;
	border-bottom: 1px solid ${neutralColors.gray[400]};
	align-items: center;
	${props =>
		props.onClick &&
		`cursor: pointer;
	gap: 8px;
	align-items: center;`}
`;

const ProjectTitleCell = styled(TableCell)`
	cursor: pointer;
	& > svg {
		display: none;
	}
	&:hover > svg {
		display: block;
	}
`;

const CurrencyBadge = styled(SublineBold)`
	padding: 2px 8px;
	border: 2px solid ${neutralColors.gray[400]};
	border-radius: 50px;
	color: ${neutralColors.gray[700]};
`;

export default DonationTable;
