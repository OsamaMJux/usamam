import { useParams, Navigate } from "react-router-dom";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseSnapshot from "@/components/case-study/CaseSnapshot";
import SectionBlock from "@/components/case-study/SectionBlock";
import TwoColumnSection from "@/components/case-study/TwoColumnSection";
import BulletList from "@/components/case-study/BulletList";
import MetricsGrid from "@/components/case-study/MetricsGrid";
import ProcessSteps from "@/components/case-study/ProcessSteps";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <CaseStudyHero
        title={caseStudy.title}
        client={caseStudy.client}
        category={caseStudy.category}
        outcomeStatement={caseStudy.outcomeStatement}
        heroImage={caseStudy.heroImage}
        metrics={caseStudy.heroMetrics}
      />

      <CaseSnapshot snapshot={caseStudy.snapshot} />

      <TwoColumnSection
        number="01"
        title="Problem"
        leftTitle="User Problems"
        leftContent={<BulletList items={caseStudy.problem.userProblems} />}
        rightTitle="Business Challenges"
        rightContent={<BulletList items={caseStudy.problem.businessChallenges} />}
      />

      <TwoColumnSection
        number="02"
        title="Goals"
        leftTitle="Business Goals"
        leftContent={<BulletList items={caseStudy.goals.businessGoals} variant="check" />}
        rightTitle="User Goals"
        rightContent={<BulletList items={caseStudy.goals.userGoals} variant="check" />}
        variant="highlight"
      />

      <SectionBlock number="03" title="My Role">
        <p className="text-muted-foreground mb-4">{caseStudy.myRole.ownershipLevel}</p>
        <BulletList items={caseStudy.myRole.responsibilities} variant="numbered" />
      </SectionBlock>

      <TwoColumnSection
        number="04"
        title="Research"
        leftTitle="Methods"
        leftContent={<BulletList items={caseStudy.research.methods} variant="numbered" />}
        rightTitle="Key Insights"
        rightContent={<BulletList items={caseStudy.research.insights} variant="check" />}
        variant="highlight"
      />

      <TwoColumnSection
        number="05"
        title="Strategy"
        leftTitle="UX Principles"
        leftContent={<BulletList items={caseStudy.strategy.uxPrinciples} />}
        rightTitle="Design Approach"
        rightContent={<BulletList items={caseStudy.strategy.designApproach} />}
      />

      <TwoColumnSection
        number="06"
        title="User Flow & Information Architecture"
        leftTitle="Key User Flows"
        leftContent={<ProcessSteps steps={caseStudy.userFlow.keyFlows} />}
        rightTitle="Structural Improvements"
        rightContent={<BulletList items={caseStudy.userFlow.structuralImprovements} variant="check" />}
        variant="highlight"
      />

      <SectionBlock number="07" title="Design Process" variant="dark">
        <div className="grid md:grid-cols-2 gap-10">
          <ProcessSteps steps={caseStudy.designProcess.wireframes} title="Wireframes" />
          <BulletList items={caseStudy.designProcess.uiDirection} variant="default" />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Accessibility (WCAG AA)
          </h3>
          <BulletList items={caseStudy.designProcess.accessibility} variant="check" columns={2} />
        </div>
      </SectionBlock>

      <SectionBlock number="08" title="Final Solution">
        <div className="grid md:grid-cols-2 gap-10 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <BulletList items={caseStudy.finalSolution.keyFeatures} variant="check" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">UX Improvements</h3>
            <BulletList items={caseStudy.finalSolution.uxImprovements} variant="check" />
          </div>
        </div>
      </SectionBlock>

      <TwoColumnSection
        number="09"
        title="Results"
        leftTitle="Key Metrics"
        leftContent={<MetricsGrid metrics={caseStudy.results.metrics} />}
        rightTitle="Impact"
        rightContent={<BulletList items={caseStudy.results.impact} variant="check" />}
        variant="highlight"
      />

      <TwoColumnSection
        number="10"
        title="Learnings"
        leftTitle="What Worked"
        leftContent={<BulletList items={caseStudy.learnings.whatWorked} variant="check" />}
        rightTitle="What I'd Improve"
        rightContent={<BulletList items={caseStudy.learnings.whatToImprove} />}
      />

      <SectionBlock number="11" title="Next Steps" variant="dark">
        <BulletList items={caseStudy.nextSteps} variant="numbered" />
      </SectionBlock>

      <CaseStudyCTA nextCaseStudy={caseStudy.nextCaseStudy} />
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
