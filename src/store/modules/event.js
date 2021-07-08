'use strict'

import eventApi from '@/services/eventApi';

const state = {
  events: [],
	event: {},
};

const getters = {
	events: state => state.events,
	event: state => state.event,
	eventById: state => id => {
		return state.events.find(event => event.id === id)
	},
};

const actions = {
  async addEventImage(context, payload) {
    try {
      // api call
      const data = await eventApi.addEventImage(payload)
      await context.dispatch('setMessage', {text: 'Image upload successful!', status: true});
      return data;
    } catch (err) {
      await context.dispatch('setMessage', {text: err.message || `Image upload failed!`, status: false});
      return;
    }
	},
  async addEvent(context, payload) {
    try {
      // api call
      const data = await eventApi.addEvent(payload);
      await context.dispatch('setMessage', {text: data, status: true});
      await context.dispatch('getEvents');
      return data;
    } catch (err) {
      await context.dispatch('setMessage', {text: err.message || `Event add failed!`, status: false});
      return;
    }
  },
  async getEvents(context) {
    try {
      // api call
      const data= await eventApi.getEvents();
      await context.commit('GET_EVENTS', data );
      await context.dispatch('setMessage', {text: 'Events fetch successful!', status: true});
      return data;
    } catch (err) {
      await context.dispatch('setMessage', {text: err.message || `Events fetch failed!`, status: false});
      return;
    }
  },
  async getEvent(context, payload) {
    try {
      // api call
      const data = await eventApi.getEvent(payload);
      await context.commit('GET_EVENT', data)
      await context.dispatch('setMessage', {text: 'Event fetch successful!', status: true});
      return data;
    } catch (err) {
      await context.dispatch('setMessage', {text: err.message || `Event fetch failed!`, status: false});
      return;
    }
  },
  async updateEvent(context, payload) {
    try {
      // api call
      const data = await eventApi.updateEvent(payload);
      await context.commit('UPDATE_EVENT', payload);
      await context.dispatch('setMessage', {text: data, status: true});
      await context.dispatch('getEvent', payload.id);
      return data;
    } catch (err) {
      await context.dispatch('setMessage', {text: err.message || `Event update failed!`, status: false});
      return;
    }
  },
  async deleteEvent(context, payload) {
    try {
      // api call
      const data = await eventApi.deleteEvent(payload);
      await context.dispatch('setMessage', {text: data, status: true});
      await context.commit('DELETE_EVENT', payload);
      return data;
    } catch (err) {
      await context.dispatch('setMessage', {text:  err.message || `Event delete failed!`, status: false});
      return;
    }
  },
};

const mutations = {
  ADD_EVENT(state, event) {
    state.events.unshift(event);
  },
  GET_EVENT(state, event) {
    state.event = event;
  },
  GET_EVENTS(state, events) {
    state.events = events;
  },
  UPDATE_EVENT(state, payload) {
    const index = state.events.findIndex(event => event.id === payload.id);
    if (index !== -1) {
      state.events.splice(index, 1, payload);
    }
  },
  DELETE_EVENT(state, payload) {
    state.events = state.events.filter(event => event.id !== payload);
  },
};

export default {
	state,
	getters,
	actions,
	mutations
};