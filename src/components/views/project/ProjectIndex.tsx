import ProjectActionsCard from "./ProjectActionsCard";
import ProjectHeader from "./ProjectHeader";
import { client } from "@/apollo/apolloClient";
import { FETCH_PROJECT_BY_SLUG } from "@/apollo/gql/gqlProjects";
import { EProjectStatus } from "@/apollo/types/gqlEnums";
import { IProject } from "@/apollo/types/types";
import InfoBadge from "@/components/badges/InfoBadge";
import InlineToast from "@/components/toasts/InlineToast";
import SuccessfulCreation from "@/components/views/create/SuccessfulCreation";
import SimilarProjects from "@/components/views/project/SimilarProjects";
import useUser from "@/context/UserProvider";
import { deviceSize, mediaQueries } from "@/lib/constants/constants";
import { ProjectMeta } from "@/lib/meta";
import { Box } from "@chakra-ui/react";
import { Caption, Container, semanticColors } from "@giveth/ui-design-system";
import { captureException } from "@sentry/nextjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";


const NotAvailableProject = dynamic(() => import("./NotAvailableProject"), {
  ssr: false,
});
const RichTextViewer = dynamic(() => import("@/components/RichTextViewer"), {
  ssr: false,
});

const ProjectIndex = (props: { project?: IProject }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [project, setProject] = useState<IProject | undefined>(props.project);
  const [creationSuccessful, setCreationSuccessful] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const {
    state: { user },
  } = useUser();

  const {
    description = "",
    title,
    status,
    id = "",
    walletAddress,
  } = project || {};
  const router = useRouter();
  const slug = router.query.projectIdSlug as string;

  const fetchProject = async () => {
    client
      .query({
        query: FETCH_PROJECT_BY_SLUG,
        variables: { slug, connectedWalletUserId: Number(user?.id) },
        fetchPolicy: "network-only",
      })
      .then((res: { data: { projectBySlug: IProject } }) => {
        setProject(res.data.projectBySlug);
      })
      .catch((error: unknown) => {
        setIsCancelled(true);
        captureException(error, {
          tags: {
            section: "fetchProject",
          },
        });
      });
  };

  useEffect(() => {
    if (status) {
      setIsActive(status.name === EProjectStatus.ACTIVE);
      setIsDraft(status.name === EProjectStatus.DRAFT);
      setIsCancelled(status.name === EProjectStatus.CANCEL);
    }
  }, [status]);

  useEffect(() => {
    if (slug && user?.id) {
      fetchProject().then();
    }
  }, [slug, user?.id]);

  useEffect(() => {
    const windowResizeHandler = () => {
      if (window.screen.width < deviceSize.tablet) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    windowResizeHandler();
    window.addEventListener("resize", windowResizeHandler);
    return () => {
      removeEventListener("resize", windowResizeHandler);
    };
  }, []);

  if (creationSuccessful) {
    return (
      <SuccessfulCreation
        showSuccess={setCreationSuccessful}
        project={project as IProject}
      />
    );
  }

  if (isCancelled) {
    return <NotAvailableProject />;
  }

  return (
    <>
      <Wrapper>
        <Head>
          <title>{title && `${title} |`} Giftomy</title>
          <ProjectMeta project={project} preTitle="Check out" />
        </Head>

        <ProjectHeader project={project} />
        {isDraft && (
          <DraftIndicator>
            <InfoBadge />
            <Caption medium>This is a preview of your project.</Caption>
          </DraftIndicator>
        )}
        <BodyWrapper>
          <ContentWrapper>
            {!isActive && !isDraft && (
              <InlineToast message="This project is not active." />
            )}
						<Box mt={10}>
							<RichTextViewer content={description} />
						</Box>
          </ContentWrapper>
          {project && (
            <ProjectActionsCard
              isDraft={isDraft}
              project={project!}
              isMobile={isMobile}
              isActive={isActive}
              setIsActive={setIsActive}
              setIsDraft={setIsDraft}
              setCreationSuccessful={setCreationSuccessful}
            />
          )}
        </BodyWrapper>
      </Wrapper>
      <SimilarProjects slug={slug} />
    </>
  );
};

const DraftIndicator = styled.div`
  color: ${semanticColors.blueSky[600]};
  background: ${semanticColors.blueSky[100]};
  display: flex;
  gap: 18px;
  padding: 25px 150px;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const BodyWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  min-height: calc(100vh - 312px);

  ${mediaQueries.tablet} {
    padding: 0 32px;
  }

  ${mediaQueries.laptop} {
    padding: 0 40px;
  }

  ${mediaQueries.desktop} {
    max-width: 1280px;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 0 16px 0 16px;

  ${mediaQueries.tablet} {
    padding: 0 24px 0 0;
  }
`;

export default ProjectIndex;