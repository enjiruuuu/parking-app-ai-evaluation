import { Component } from 'solid-js';
import { For } from 'solid-js';
import ReportCard from './ReportCard';
import { reports } from '../stores/reportStore';

const ReportList: Component = () => {
  return (
    <div data-testid="reports-list" class="reports-list">
      <For each={reports()}>
        {(report) => <ReportCard report={report} />}
      </For>
    </div>
  );
};

export default ReportList;
